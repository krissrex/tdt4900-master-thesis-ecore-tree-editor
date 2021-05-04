package no.ntnu.stud.krirek.treelsp.emf;

import no.ntnu.stud.krirek.treelsp.model.tree.*;
import org.eclipse.emf.common.util.EList;
import org.eclipse.emf.ecore.*;
import org.eclipse.emf.ecore.resource.Resource;
import org.eclipse.emf.ecore.resource.ResourceSet;
import org.eclipse.emf.ecore.util.EcoreUtil;
import org.eclipse.emf.edit.provider.ReflectiveItemProvider;
import org.eclipse.emf.edit.provider.ReflectiveItemProviderAdapterFactory;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import java.io.IOException;
import java.util.HashSet;
import java.util.List;

public class EcoreToTreeDocumentModelMapper {

    Logger log = LoggerFactory.getLogger(EcoreToTreeDocumentModelMapper.class);

    @Inject
    public EcoreToTreeDocumentModelMapper() {
    }

    public TreeDocument map(@NotNull ResourceSet model) {
        final ImmutableTreeDocument.Builder treeDocumentBuilder = ImmutableTreeDocument.builder();

        final EList<Resource> resources = model.getResources();
        for (Resource resource : resources) {
            if (!ensureLoaded(resource)) {
                log.warn("Resource {} is not loaded. Skipping!", resource.getURI().toString());
                continue;
            }

            ImmutableTreeRoot.Builder treeRootBuilder = mapTreeRoot(resource);
            treeDocumentBuilder.addRoots(treeRootBuilder.build());
        }

        return treeDocumentBuilder.build();
    }

    @NotNull
    private ImmutableTreeRoot.Builder mapTreeRoot(Resource resource) {
        final ImmutableTreeRoot.Builder treeRootBuilder = ImmutableTreeRoot.builder();
        treeRootBuilder.id(resource.getURI().toFileString());

        final ImmutableActionConfiguration.Builder actionConfigurationBuilder = mapActionConfiguration(resource);
        treeRootBuilder.actions(actionConfigurationBuilder.build());

        final ImmutableHierarchyConfiguration.Builder hierarchyBuilder = mapHierarchy(resource);
        treeRootBuilder.hierarchy(hierarchyBuilder.build());

        //treeRootBuilder.icons() // TODO: implement

        final EList<EObject> contents = resource.getContents();
        if (contents.size() > 1) {
            throw new IllegalArgumentException("Mutliple roots! What to do?");
        }
        final EObject rootObject = contents.get(0);
        final HashSet<String> visitedNodeTypes = new HashSet<>();
        final ImmutableTreeNode.Builder treeNodeBuilder = mapTreeNode(rootObject);
        treeRootBuilder.rootNode(treeNodeBuilder.build());

        return treeRootBuilder;
    }

    @NotNull
    private ImmutableTreeNode.Builder mapTreeNode(EObject nodeObject) {
        // FIXME: avoid circular recursion? Is it even possible, with e.g. children of same type as parent?
        final ImmutableTreeNode.Builder treeNodeBuilder = ImmutableTreeNode.builder();

        treeNodeBuilder.id(uuid(nodeObject));
        treeNodeBuilder.name(name(nodeObject));
        treeNodeBuilder.type(nodeObject.eClass().getName()); // FIXME: some options here, like instanceTypeName and instanceClassName, which one is correct?
        treeNodeBuilder.documentation(documentation(nodeObject));

        final EList<EObject> children = nodeObject.eContents(); // Also adds EAnnotation etc.
        for (EObject child : children) {
            final ImmutableTreeNode.Builder childBuilder = mapTreeNode(child);
            treeNodeBuilder.addChildren(childBuilder.build());
        }

        return treeNodeBuilder;
    }

    /**
     * Get an appropriate name for a node.
     * @param nodeObject An object that is a tree node.
     * @return some label that can name the {@code nodeObject}.
     */
    protected String name(EObject nodeObject) {
        // TODO: use an adapter factory or label provider or something
        if (nodeObject instanceof ENamedElement) {
            String name = ((ENamedElement) nodeObject).getName();
            return name;
        } else if (nodeObject instanceof EGenericType) {
            final EGenericType eGenericType = (EGenericType) nodeObject;
            final EClassifier eClassifier = eGenericType.getEClassifier();
            if (eClassifier != null) {
                final String name = eClassifier.getName();
                if (name == null) {
                    return eClassifier.getInstanceTypeName();
                }
                return name;
            } else if (eGenericType.getETypeParameter() != null) {
                return eGenericType.getETypeParameter().getName();
            } else {
                // Can also use "super lowerBound" and "extends upperBound" in addition to only ?
                return "?";
            }
        } else {
            log.debug("Not sure how to name EObject {}. Falling back to ReflectiveItemProvider.", nodeObject);
            final ReflectiveItemProvider reflectiveItemProvider = new ReflectiveItemProvider(new ReflectiveItemProviderAdapterFactory()) {
                final Logger itemProviderLogger = LoggerFactory.getLogger(this.getClass());

                @Override
                public String getText(Object object) {
                    final EObject eObject = (EObject) object;
                    final EClass eClass = eObject.eClass();
                    EStructuralFeature feature = getLabelFeature(eClass);
                    if (feature != null) {
                        final Object value = eObject.eGet(feature);
                        if (value != null) {
                            return value.toString();
                        }
                    }

                    itemProviderLogger.warn("No label found for object {}", object);
                    return "";
                }
            };
            return reflectiveItemProvider.getText(nodeObject);
        }
    }

    @NotNull
    private ImmutableHierarchyConfiguration.Builder mapHierarchy(Resource resource) {
        final ImmutableHierarchyConfiguration.Builder hierarchyBuilder = ImmutableHierarchyConfiguration.builder();

        if (isEcoreMetamodel(resource)) {
            // This should mean Ecore is the metamodel, and we have a .ecore metamodel file in the resource.
            hierarchyBuilder.putAllowedChildren("EPackage", List.of("EClass", "EDataType", "EAnnotation")); //TODO add all hierarchy
            hierarchyBuilder.putAllowedChildren("EClass", List.of("EAttribute", "EReference", "EAnnotation"));
            hierarchyBuilder.putAllowedChildren("EAnnotation", List.of(EcorePackage.eINSTANCE.getEAnnotation_Details().getEType().getName()));
            hierarchyBuilder.putAllowedChildren("EAttribute", List.of());
            hierarchyBuilder.putAllowedChildren("EReference", List.of());
            hierarchyBuilder.putAllowedChildren("EDataType", List.of());
        }
        // TODO what about reflective model editor? Models where metamodel is not Ecore; xmi model instances etc.

        return hierarchyBuilder;
    }

    @NotNull
    private ImmutableActionConfiguration.Builder mapActionConfiguration(Resource resource) {
        final ImmutableActionConfiguration.Builder actionConfigurationBuilder = ImmutableActionConfiguration.builder();

        if (isEcoreMetamodel(resource)) {
            useEcoreActionConfiguration(actionConfigurationBuilder);
            // TODO what about reflective model editor? Models where metamodel is not Ecore; xmi model instances etc.
        }
        return actionConfigurationBuilder;
    }

    private void useEcoreActionConfiguration(ImmutableActionConfiguration.Builder actionConfigurationBuilder) {
        // TODO: add all actions here
        actionConfigurationBuilder.addAvailableActions(
                ImmutableAction.builder().id("ecore:dynamic-instance")
                        .name("Create dynamic instance")
                        .build(),
                ImmutableAction.builder().id("ecore:create-genmodel")
                        .name("Create genmodel file")
                        .build()
        );
        actionConfigurationBuilder.addDefaultActionbarActions("ecore:dynamic-instance");
        actionConfigurationBuilder.putNodeActions("EPackage", List.of("ecore:create-genmodel"));
    }

    /**
     * Should return {@code false} for a dynamic instance xmi.
     *
     * @param resource the resource with model elements that may be from the Ecore metamodel.
     * @return {@code true} if at least one root element in {@link Resource#getContents()} is from the {@link EcorePackage}.
     */
    protected boolean isEcoreMetamodel(Resource resource) {
        final String ecoreNsUri = EcorePackage.eINSTANCE.getNsURI();
        final EList<EObject> contents = resource.getContents();
        for (EObject rootEObject : contents) {
            final String metamodelNsUri = rootEObject.eClass().getEPackage().getNsURI();
            boolean isEcoreMetamodel = ecoreNsUri.equals(metamodelNsUri);
            if (isEcoreMetamodel) {
                return true;
            }
        }
        return false;
    }

    protected @Nullable String documentation(Object object) {
        if (object instanceof EModelElement) {
            final EClass instanceClass = ((EModelElement) object).eClass();
            final String instanceClassDocs = EcoreUtil.getAnnotation(instanceClass, EcoreUtil.GEN_MODEL_ANNOTATION_URI, "documentation");
            if (instanceClassDocs != null) {
                return instanceClassDocs;
            }
        }

        if (object instanceof EModelElement) {
            final String documentation = EcoreUtil.getAnnotation((EModelElement) object, EcoreUtil.GEN_MODEL_ANNOTATION_URI, "documentation");
            if (documentation != null) {
                return documentation.trim();
            }

        }

        return null; // TODO: add default docs for ecore types.
    }

    protected String uuid(EObject object) {
        final String id = UuidEcoreResourceFactoryImpl.getId(object);
        if (id == null) {
            return EcoreUtil.getIdentification(object); // FIXME: probably a better workaround for this
        }
        return id;
    }

    private boolean ensureLoaded(Resource resource) {
        if (!resource.isLoaded()) {
            try {
                resource.load(null);
            } catch (IOException e) {
                log.error("Failed to load resource {}", resource.getURI().toString(), e);
            }
        }
        return resource.isLoaded();
    }
}
