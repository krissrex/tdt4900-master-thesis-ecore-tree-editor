package no.ntnu.stud.krirek.treelsp.jsonrpc.protocol;

import org.eclipse.lsp4j.jsonrpc.services.JsonDelegate;
import org.eclipse.lsp4j.jsonrpc.services.JsonNotification;
import org.eclipse.lsp4j.jsonrpc.services.JsonRequest;

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
}
