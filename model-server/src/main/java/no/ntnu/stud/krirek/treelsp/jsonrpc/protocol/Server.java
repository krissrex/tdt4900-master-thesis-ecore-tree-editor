package no.ntnu.stud.krirek.treelsp.jsonrpc.protocol;

import org.eclipse.lsp4j.jsonrpc.services.JsonDelegate;
import org.eclipse.lsp4j.jsonrpc.services.JsonRequest;

import java.util.concurrent.CompletableFuture;

public interface Server {

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
