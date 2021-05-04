package no.ntnu.stud.krirek.treelsp.jsonrpc.protocol;

import no.ntnu.stud.krirek.treelsp.model.tree.TreeDocument;
import org.eclipse.lsp4j.jsonrpc.services.JsonDelegate;
import org.eclipse.lsp4j.jsonrpc.services.JsonNotification;
import org.eclipse.lsp4j.jsonrpc.services.JsonRequest;

import java.util.List;
import java.util.concurrent.CompletableFuture;

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
