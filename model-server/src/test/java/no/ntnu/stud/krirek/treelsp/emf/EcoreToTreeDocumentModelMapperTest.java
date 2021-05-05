package no.ntnu.stud.krirek.treelsp.emf;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import no.ntnu.stud.krirek.treelsp.model.tree.*;
import org.eclipse.emf.common.util.EList;
import org.eclipse.emf.ecore.*;
import org.eclipse.emf.ecore.resource.Resource;
import org.eclipse.emf.ecore.resource.ResourceSet;
import org.eclipse.emf.ecore.xmi.XMLResource;
import org.jetbrains.annotations.NotNull;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.net.URL;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.fail;

class EcoreToTreeDocumentModelMapperTest {

    @Test
    void loadsModelCorrectly() throws Exception {
        // Given
        final ResourceSet resourceSet = EmfTestUtils.loadMyEcoreModel();

        // Then
        final EList<Resource> resources = resourceSet.getResources();
        assertThat(resources).hasSize(1);

        final Resource resource = resources.get(0);
        assertThat(resource.isLoaded()).isTrue();
        assertThat(resource).isInstanceOf(XMLResource.class); // Required for extrinsic IDs.

        final EList<EObject> contents = resource.getContents();
        assertThat(contents).hasSize(1);

        final EObject rootPackage = contents.get(0);
        assertThat(rootPackage.eClass().getName()).isEqualTo("EPackage");
        final String packageUuid = (((XMLResource) resource)).getID(rootPackage); // The extrinsic ID lies in the resource, not the eObject/EPackage
        assertThat(packageUuid).isNotNull();
        EPackage ePackage = (EPackage) rootPackage;
        assertThat(ePackage.getNsPrefix()).isEqualTo("no.ntnu");
        assertThat(ePackage.getNsURI()).isEqualTo("http://ntnu.no/krirek/ecore/test");
        assertThat(ePackage.getName()).isEqualTo("MyEcore");
        final EList<EAnnotation> eAnnotations = ePackage.getEAnnotations();
        assertThat(eAnnotations).isEmpty();

        /*final TreeIterator<EObject> eObjectTreeIterator = rootPackage.eAllContents();
        while (eObjectTreeIterator.hasNext()) {
            final EObject child = eObjectTreeIterator.next(); // This iterator looks useful
        }*/

        final EList<EObject> classesAndDatatypes = rootPackage.eContents();
        assertThat(classesAndDatatypes).hasSize(4);

        final EObject testClass = classesAndDatatypes.get(0);
        assertThat(testClass.eClass().getName()).isEqualTo("EClass");
        EClass eTestClass = (EClass) testClass;
        assertThat(eTestClass.getName()).isEqualTo("TestClass");

        final EObject myEnum = classesAndDatatypes.get(1);
        assertThat(myEnum.eClass().getName()).isEqualTo("EDataType");
        EDataType eMyEnum = (EDataType) myEnum;
        assertThat(eMyEnum.getName()).isEqualTo("MyEnum");
        assertThat(eMyEnum.getInstanceTypeName()).isEqualTo("MyEnumType");

    }

    @Test
    void mapMyEcoreToTreeDocumentModel() throws Exception {
        // Given
        final ResourceSet resourceSet = EmfTestUtils.loadMyEcoreModel();

        // When
        final EcoreToTreeDocumentModelMapper mapper = new EcoreToTreeDocumentModelMapper();
        final TreeDocument model = mapper.map(resourceSet);

        // Then
        assertThat(model).isNotNull();
        assertThat(model.roots()).hasSize(1);

        final TreeRoot treeRoot = model.roots().get(0);
        assertThat(treeRoot.id()).isEqualTo(".\\test-model\\MyEcore.ecore");
        assertThat(treeRoot.rootNode()).isNotNull();
        assertThat(treeRoot.actions()).isNotNull();
        assertThat(treeRoot.hierarchy()).isNotNull();

        final TreeNode rootNode = treeRoot.rootNode();
        assertThat(rootNode).isNotNull();
        assertThat(rootNode.id()).hasSize("_0k6nAKmlEeuKtOVN1nhsGQ".length()); // Uses EcoreUtil.getUUID().
        assertThat(rootNode.name()).isEqualTo("MyEcore");
        assertThat(rootNode.editorState()).isNull();
        assertThat(rootNode.type()).isEqualTo("EPackage");
        assertThat(rootNode.children()).hasSize(4);

        final TreeNode classNode = rootNode.children().get(0);
        assertThat(classNode).isNotNull();
        assertThat(classNode.id()).hasSize("_0k6nAKmlEeuKtOVN1nhsGQ".length());
        assertThat(classNode.id()).isNotEqualTo(rootNode.id());
        assertThat(classNode.name()).isEqualTo("TestClass");
        assertThat(classNode.type()).isEqualTo("EClass");
        assertThat(classNode.documentation()).isEqualTo("This is the main class. Kristian is cool"); // TODO this uses custom docs, not default Ecore docs.
        assertThat(classNode.iconOverride()).isNull();

        final TreeNode myOperationNode = classNode.children().get(2);
        assertThat(myOperationNode.name()).isEqualTo("myOperation");
        assertThat(myOperationNode.type()).isEqualTo("EOperation");

        final TreeNode genericTypeNode = myOperationNode.children().get(0);
        assertThat(genericTypeNode.name()).isEqualTo("EString");
        assertThat(genericTypeNode.type()).isEqualTo("EGenericType");

    }

    @Test @Disabled("The (extrinsic) IDs are not stable between model loads, so the IDs always differ.")
    void jsonSerializesCorrectly() throws Exception {
        // Given
        final ResourceSet resourceSet = EmfTestUtils.loadMyEcoreModel();
        final EcoreToTreeDocumentModelMapper mapper = new EcoreToTreeDocumentModelMapper();
        final TreeDocument model = mapper.map(resourceSet);
        final Gson gson = new GsonBuilder().setPrettyPrinting().create();
        final URL treeDocumentJsonSnapshot = getClass().getClassLoader().getResource("test-resources/emf/MyEcore_treedocument_snapshot.json");
        final File jsonSnapshotFile = new File(treeDocumentJsonSnapshot.getFile());


        // When
        final String treeDocumentJson = gson.toJson(model);
        // Uncomment to update snapshot:
        //FileWriter snapshot = new FileWriter(jsonSnapshotFile); snapshot.write(treeDocumentJson); snapshot.close();
        // Then copy contents from `target/test-classes/test-resources/emf/MyEcore_treedocument_snapshot.json` into `src/test/...`.

        // Then
        //NB: build the project if the file is changed. The file is copied to `target/test-classes/` only on build.
        assertThat(jsonSnapshotFile).hasContent(treeDocumentJson);
    }

    @Test
    void usesEcoreHierarchyForEcoreMetamodels() throws Exception {
        // Given
        final EcoreToTreeDocumentModelMapper mapper = new EcoreToTreeDocumentModelMapper();
        final ResourceSet resourceSet = EmfTestUtils.loadMyEcoreModel();

        // When
        final TreeDocument document = mapper.map(resourceSet);
        final HierarchyConfiguration hierarchy = document.roots().get(0).hierarchy();
        final Map<String, @NotNull List<String>> allowedChildren = hierarchy.allowedChildren();

        // Then
        assertThat(allowedChildren.keySet()).hasSize(6); //TODO update to correct amount
        assertThat(allowedChildren).containsOnlyKeys("EPackage", "EClass", "EAnnotation", "EReference", "EAttribute", "EDataType");
        assertThat(allowedChildren).doesNotContainKey(null);

        assertThat(allowedChildren).doesNotContainValue(null);
        assertThat(allowedChildren.get("EPackage")).containsExactlyInAnyOrder("EClass", "EDataType", "EAnnotation");
        assertThat(allowedChildren.get("EClass")).containsExactlyInAnyOrder("EReference", "EAttribute", "EAnnotation");
        assertThat(allowedChildren.get("EAnnotation")).containsExactlyInAnyOrder("EStringToStringMapEntry");
        // TODO: add more hierarchy here.
        fail("Not done. Missing many hierarchy keys and values in the tests");
    }

    @Test
    void usesEcoreActionConfiguration() throws Exception {
        // Given
        final EcoreToTreeDocumentModelMapper mapper = new EcoreToTreeDocumentModelMapper();
        final ResourceSet resourceSet = EmfTestUtils.loadMyEcoreModel();

        // When
        final TreeDocument doc = mapper.map(resourceSet);
        final ActionConfiguration actions = doc.roots().get(0).actions();
        final List<Action> availableActions = actions.availableActions();
        final List<String> defaultActionbarActions = actions.defaultActionbarActions();
        final Map<String, @NotNull List<String>> nodeActions = actions.nodeActions();

        // Then
        assertThat(availableActions).hasSize(2); // FIXME
        assertThat(defaultActionbarActions).containsExactlyInAnyOrder("ecore:dynamic-instance"); //FIXME
        assertThat(nodeActions).hasSize(1); // FIXME
        assertThat(nodeActions.get("EPackage")).containsExactlyInAnyOrder("ecore:create-genmodel");

        fail("Not done. The configuration is missing lots of node actions etc.");

    }
}