package no.ntnu.stud.krirek.treelsp.emf;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import no.ntnu.stud.krirek.treelsp.model.tree.TreeDocument;
import no.ntnu.stud.krirek.treelsp.model.tree.TreeNode;
import no.ntnu.stud.krirek.treelsp.model.tree.TreeRoot;
import org.assertj.core.api.Assertions;
import org.assertj.core.api.FileAssert;
import org.eclipse.emf.common.util.EList;
import org.eclipse.emf.common.util.URI;
import org.eclipse.emf.ecore.*;
import org.eclipse.emf.ecore.resource.Resource;
import org.eclipse.emf.ecore.resource.ResourceSet;
import org.eclipse.emf.ecore.resource.impl.ResourceFactoryImpl;
import org.eclipse.emf.ecore.resource.impl.ResourceSetImpl;
import org.eclipse.emf.ecore.util.EcoreUtil;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.FileWriter;
import java.net.URL;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.fail;

class EcoreToTreeDocumentModelMapperTest {

    @Test
    void loadsModelCorrectly() throws Exception {
        // Given
        final ResourceSet resourceSet = loadModel();

        // Then
        final EList<Resource> resources = resourceSet.getResources();
        assertThat(resources).hasSize(1);

        final Resource resource = resources.get(0);
        assertThat(resource.isLoaded()).isTrue();

        final EList<EObject> contents = resource.getContents();
        assertThat(contents).hasSize(1);

        final EObject rootPackage = contents.get(0);
        assertThat(rootPackage.eClass().getName()).isEqualTo("EPackage");
        assertThat(EcoreUtil.getID(rootPackage)).isNotNull();
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
        final ResourceSet resourceSet = loadModel();

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
        assertThat(classNode.documentation()).isNull(); // TODO: add docs
        assertThat(classNode.iconOverride()).isNull();
    }

    @Test @Disabled("The IDs are not stable, so they always differ.")
    void jsonSerializesCorrectly() throws Exception {
        // Given
        final ResourceSet resourceSet = loadModel();
        final EcoreToTreeDocumentModelMapper mapper = new EcoreToTreeDocumentModelMapper();
        final TreeDocument model = mapper.map(resourceSet);
        final Gson gson = new GsonBuilder().setPrettyPrinting().create();
        final URL treeDocumentJsonSnapshot = getClass().getClassLoader().getResource("test-resources/emf/MyEcore_treedocument_snapshot.json");
        final File jsonSnapshotFile = new File(treeDocumentJsonSnapshot.getFile());


        // When
        final String treeDocumentJson = gson.toJson(model);

        // Then
        //NB: build the project if the file is changed. The file is copied to `target/test-classes/` only on build.
        Assertions.assertThat(jsonSnapshotFile).hasContent(treeDocumentJson);
    }

    static ResourceSet loadModel() throws Exception {
        EcorePackage.eINSTANCE.eClass(); // Register ecore package
        ResourceSet rs = new ResourceSetImpl();
        rs.getResourceFactoryRegistry().getExtensionToFactoryMap().put("ecore", new UuidEcoreResourceFactoryImpl());
        rs.getResourceFactoryRegistry().getExtensionToFactoryMap().put("genmodel", new UuidEcoreResourceFactoryImpl());

        final Resource resource = rs.createResource(URI.createURI("./test-model/MyEcore.ecore"));
        resource.load(null);
        return rs;
    }
}