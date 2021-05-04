package no.ntnu.stud.krirek.treelsp.jsonrpc;

import no.ntnu.stud.krirek.treelsp.jsonrpc.protocol.Server;
import no.ntnu.stud.krirek.treelsp.jsonrpc.protocol.Workspace;
import no.ntnu.stud.krirek.treelsp.model.tree.TreeDocument;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

import static org.assertj.core.api.Assertions.*;

class TLSPJsonRpcServerTest {


    @Test()
    @Tag("integration")
    void findModelInWorkspace() throws Exception {
        // Given
        final TLSPJsonRpcServer server = TLSPJsonRpcServer.create();
        server.start();
        final String workspaceUri = new File("./test-model/").getAbsoluteFile().toURI().toString();
        final String modelFileUri = (new File("test-model", "MyEcore.ecore")).getAbsoluteFile().toURI().toString(); // file:/C:/Dev/Master/vscode-ecore-tree-editor/model-server/test-model/MyEcore.ecore

        try (server) {
            // When
            final Workspace.WorkspaceConfig workspaceConfig = new Workspace.WorkspaceConfig(workspaceUri);

            server.getServer().workspace().setWorkspaceUri(workspaceConfig);

            Server.ModelRequest request = new Server.ModelRequest(modelFileUri);
            final CompletableFuture<TreeDocument> model = server.getServer().getModel(request);
            final TreeDocument treeDocumentModel = model.get(5, TimeUnit.SECONDS);

            // Then
            assertThat(treeDocumentModel).isNotNull();
        }
    }

    /**
     * Instead of asking for "absolute path file URI" for a model, we just ask for {@code "MyEcore.ecore"}.
     */
    @Test @Tag("integration")
    void findModelWithWorkspaceRelativeName() throws Exception {
        // Given
        final TLSPJsonRpcServer server = TLSPJsonRpcServer.create();
        server.start();
        final String workspaceUri = new File("./test-model/").toURI().toString();
        final String modelFileUri = "MyEcore.ecore"; // File#toURI would make it absolute.

        try (server) {
            final Workspace.WorkspaceConfig workspaceConfig = new Workspace.WorkspaceConfig(workspaceUri);
            server.getServer().workspace().setWorkspaceUri(workspaceConfig);

            // When
            final Server.ModelRequest request = new Server.ModelRequest(modelFileUri);
            final TreeDocument document = server.getServer().getModel(request).get();

            // Then
            assertThat(document).isNotNull();
        }
    }

    @Test @Tag("slow") @Disabled("Only works locally for kristian")
    void handlesVscodeStyleUris() throws Exception {
        // Given
        final TLSPJsonRpcServer server = TLSPJsonRpcServer.create();
        server.start();
        // It is slow because the DefaultModelResourceManager will try to load resources for EVERY file in the workspace
        String workspaceUri = "file:///c%3A/Users/krire/eclipse-workspace/TreeLanguageServerProtocol";
        String modelFileUri = "file:///c%3A/Users/krire/eclipse-workspace/TreeLanguageServerProtocol/model/Ecore.ecore";

        // When
        try (server) {
            final Workspace.WorkspaceConfig workspaceConfig = new Workspace.WorkspaceConfig(workspaceUri);
            server.getServer().workspace().setWorkspaceUri(workspaceConfig);

            final Server.ModelRequest request = new Server.ModelRequest(modelFileUri);
            final TreeDocument document = server.getServer().getModel(request).get();

            // Then
            assertThat(document).isNotNull();
        }


    }
}