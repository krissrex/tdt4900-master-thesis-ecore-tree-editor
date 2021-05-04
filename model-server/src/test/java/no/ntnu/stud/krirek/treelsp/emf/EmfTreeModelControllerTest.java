package no.ntnu.stud.krirek.treelsp.emf;

import no.ntnu.stud.krirek.treelsp.model.tree.TreeDocument;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;

import java.io.File;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class EmfTreeModelControllerTest {


    @Test
    void testGetTreeDocumentWithWorkspaceRelativeUri() {
        // Given
        final EmfTreeModelController controller = EmfTreeModelController.create();
        controller.setWorkspaceUri(EmfTestUtils.workspaceFileUri());


        // When
        final TreeDocument treeDocument = controller.getTreeDocument("MyEcore.ecore");

        // Then
        assertThat(treeDocument).isNotNull();
    }

    @Test
    void testGetTreeDocumentWithAbsoluteFileUri() {
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
    void testGetTreeDocumentWithoutSettingWorkspace() {
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
}