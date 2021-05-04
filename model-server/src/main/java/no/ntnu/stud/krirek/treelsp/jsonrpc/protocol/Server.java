package no.ntnu.stud.krirek.treelsp.jsonrpc.protocol;

import no.ntnu.stud.krirek.treelsp.model.tree.TreeDocument;
import org.eclipse.lsp4j.jsonrpc.services.JsonDelegate;
import org.eclipse.lsp4j.jsonrpc.services.JsonNotification;
import org.eclipse.lsp4j.jsonrpc.services.JsonRequest;

import java.util.List;
import java.util.concurrent.CompletableFuture;

/**
 * This is the interface which defines what the vscode extension is allowed to call.
 * The actual implementations for methods will be in {@link ServerImpl}.
 *
 * Methods that the vscode extension can send, so this server can answer to them over json-rpc.
 * They are implemented in <a href="../vscode-ecore-tree-editor-extension/src/tree-language-server/jsonrpc/TreeLanguageServerRpcClient.ts">
 *     tree-language-server/jsonrpc/TreeLanguageServerRpcClient.ts</a> .in the vscode extension.
 *
 * @see ServerImpl
 * @see Client
 * @see no.ntnu.stud.krirek.treelsp.jsonrpc.TLSPJsonRpcServer
 */
public interface Server {

    @JsonRequest
    CompletableFuture<InitializeResult> initialize(InitializeParams params);
    class InitializeResult {}
    class InitializeParams {}

    /**
     * Stop the server but dont exit the process.
     * @see #exit()
     */
    @JsonRequest
    CompletableFuture<Object> shutdown();

    /**
     * Exit the process.
     * Call {@link #shutdown()} first.
     * @see #shutdown()
     */
    @JsonNotification
    void exit();

    /**
     *
     * @return {@link Ping} with a unix timestamp for when the server got the ping.
     */
    @JsonRequest
    CompletableFuture<Ping> ping();

    class Ping {
        public long receivedAtTimestamp;
    }

    @JsonDelegate
    Workspace workspace();

    @JsonRequest
    CompletableFuture<TreeDocument> getModel(ModelRequest modelRequest);
    class ModelRequest {
        public String modelFileUri;

        public ModelRequest(String modelFileUri) {
            this.modelFileUri = modelFileUri;
        }

        public ModelRequest() {
        }
    }

    @JsonRequest
    CompletableFuture<List<String>> getDetectedModelUris();
}
