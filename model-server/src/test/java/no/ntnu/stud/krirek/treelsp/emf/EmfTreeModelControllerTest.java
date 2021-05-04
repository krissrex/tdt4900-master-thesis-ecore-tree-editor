package no.ntnu.stud.krirek.treelsp.emf;

import no.ntnu.stud.krirek.treelsp.model.tree.TreeDocument;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class EmfTreeModelControllerTest {


    @Test
    void getTreeDocumentWithWorkspaceRelativeUri() {
        // Given
        final EmfTreeModelController controller = EmfTreeModelController.create();
        controller.setWorkspaceUri(EmfTestUtils.workspaceFileUri());


        // When
        final TreeDocument treeDocument = controller.getTreeDocument("MyEcore.ecore");

        // Then
        assertThat(treeDocument).isNotNull();
    }

    @Test
    void getTreeDocumentWithAbsoluteFileUri() {
        // Given
        final EmfTreeModelController controller = EmfTreeModelController.create();
        controller.setWorkspaceUri(EmfTestUtils.workspaceFileUri());


        // When
        final String absoluteFileUri = new File("test-model", "MyEcore.ecore").toURI().toString();
        final TreeDocument treeDocument = controller.getTreeDocument(absoluteFileUri);

        // Then
        assertThat(treeDocument).isNotNull();
    }

    @Test
    void getTreeDocumentWithoutSettingWorkspaceShouldThrow() {
        // Given
        final EmfTreeModelController controller = EmfTreeModelController.create();
        final String absoluteFileUri = new File("test-model", "MyEcore.ecore").toURI().toString();

        // When
        // Not calling: controller.setWorkspaceUri(EmfTestUtils.workspaceFileUri());
        assertThatThrownBy(() -> {
            controller.getTreeDocument(absoluteFileUri);
        })
                .isInstanceOf(IllegalStateException.class)
                .hasMessage("Workspace folder must be set first");
    }

    @Test
    void findsAllModelFilesInWorkspace() {
        // Given
        final EmfTreeModelController controller = EmfTreeModelController.create();

        // When
        controller.setWorkspaceUri(EmfTestUtils.workspaceFileUri());
        final List<String> detectedModelUris = controller.getDetectedModelUris();

        // Then
        // Use filenames, as the URIs in the list are absolute and depends on where the developer has the project.
        final List<String> modelFileNames = detectedModelUris.stream()
                .map(URI::create)
                .map(File::new)
                .map(File::getName)
                .collect(Collectors.toList());

        assertThat(modelFileNames).containsExactlyInAnyOrder(
                "Ecore.ecore",
                "MyEcore.ecore",
                "MyEcore.genmodel",
                "TreeDocumentModel.ecore",
                "TreeDocumentModel.genmodel"
        );
    }
}