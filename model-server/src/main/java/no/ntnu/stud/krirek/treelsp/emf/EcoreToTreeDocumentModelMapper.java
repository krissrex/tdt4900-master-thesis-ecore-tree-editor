package no.ntnu.stud.krirek.treelsp.emf;

import no.ntnu.stud.krirek.treelsp.model.tree.*;
import org.eclipse.emf.common.util.EList;
import org.eclipse.emf.ecore.ENamedElement;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.resource.Resource;
import org.eclipse.emf.ecore.resource.ResourceSet;
import org.eclipse.emf.ecore.util.EcoreUtil;
import org.eclipse.emf.edit.provider.ReflectiveItemProvider;
import org.eclipse.emf.edit.provider.ReflectiveItemProviderAdapterFactory;
import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;

public class EcoreToTreeDocumentModelMapper {

    Logger log = LoggerFactory.getLogger(EcoreToTreeDocumentModelMapper.class);

    public TreeDocument map(ResourceSet model) {
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

        // TODO: use an adapter factory or label provider or something
        if (nodeObject instanceof ENamedElement) {
            String name = ((ENamedElement) nodeObject).getName();
            treeNodeBuilder.name(name);
        } else {
            log.warn("Not sure how to name EObject {}. Falling back to ReflectiveItemProvider.", nodeObject);
            final ReflectiveItemProvider reflectiveItemProvider = new ReflectiveItemProvider(new ReflectiveItemProviderAdapterFactory());
            treeNodeBuilder.name(reflectiveItemProvider.getText(nodeObject));
        }

        treeNodeBuilder.type(nodeObject.eClass().getName()); // FIXME: some options here, like instanceTypeName and instanceClassName, which one is correct?
        // treeNodeBuilder.documentation() // TODO: set documentation based on class etc

        // FIXME: does this add annotations too? Probably not. Use eAllContents, which navigates everything as a tree instead?
        final EList<EObject> children = nodeObject.eContents();
        for (EObject child : children) {
            final ImmutableTreeNode.Builder childBuilder = mapTreeNode(child);
            treeNodeBuilder.addChildren(childBuilder.build());
        }

        return treeNodeBuilder;
    }

    @NotNull
    private ImmutableHierarchyConfiguration.Builder mapHierarchy(Resource resource) {
        final ImmutableHierarchyConfiguration.Builder hierarchyBuilder = ImmutableHierarchyConfiguration.builder();
        final EList<EObject> contents = resource.getContents();
        for (EObject rootEObject : contents) {
            if ("EPackage".equals(rootEObject.eClass().getName())) {
                // This should mean Ecore is the metamodel, and we have a .ecore metamodel file in the resource.
                hierarchyBuilder.putAllowedChildren("EPackage", List.of("EClass", "EDataType", "EAnnotation")); //TODO add all hierarchy
                break;
            }
            // TODO what about reflective model editor? Models where metamodel is not Ecore; xmi model instances etc.
        }
        return hierarchyBuilder;
    }

    @NotNull
    private ImmutableActionConfiguration.Builder mapActionConfiguration(Resource resource) {
        final ImmutableActionConfiguration.Builder actionConfigurationBuilder = ImmutableActionConfiguration.builder();
        final EList<EObject> contents = resource.getContents();
        for (EObject rootEObject : contents) {
            if ("EPackage".equals(rootEObject.eClass().getName())) {
                // This should mean Ecore is the metamodel, and we have a .ecore metamodel file in the resource.
                useEcoreActionConfiguration(actionConfigurationBuilder);
                break;
            }
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
        actionConfigurationBuilder.addDefaultAcionbarActions("ecore:dynamic-instance");
        actionConfigurationBuilder.putNodeActions("EPackage", List.of("ecore:create-genmodel"));
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
