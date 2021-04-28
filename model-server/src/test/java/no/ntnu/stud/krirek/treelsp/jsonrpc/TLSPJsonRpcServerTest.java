package no.ntnu.stud.krirek.treelsp.jsonrpc;

import no.ntnu.stud.krirek.treelsp.jsonrpc.protocol.Server;
import no.ntnu.stud.krirek.treelsp.jsonrpc.protocol.Workspace;
import no.ntnu.stud.krirek.treelsp.model.tree.TreeDocument;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

import static org.assertj.core.api.Assertions.*;

class TLSPJsonRpcServerTest {


    @Test() @Tag("integration")
    void findModelInWorkspace() throws Exception {
        // Given
        final TLSPJsonRpcServer server = TLSPJsonRpcServer.create();
        server.start();
        final String workspaceUri = new File("./test-model/").toURI().toString();
        final String modelFileUri = new File("./test-model/MyModel.ecore").toURI().toString(); // FIXME: is this relative?

        try(server) {
            // When
            final Workspace.WorkspaceConfig workspaceConfig = new Workspace.WorkspaceConfig();
            workspaceConfig.workspaceUri = workspaceUri;

            server.getServer().workspace().setWorkspaceUri(workspaceConfig);

            Server.ModelRequest request = new Server.ModelRequest();
            request.modelFileUri = modelFileUri;
            final CompletableFuture<TreeDocument> model = server.getServer().getModel(request);
            final TreeDocument treeDocumentModel = model.get(5, TimeUnit.SECONDS);

            // Then
            assertThat(treeDocumentModel).isNotNull();
        }
    }
}