package no.ntnu.stud.krirek.treelsp.jsonrpc.protocol;

import org.eclipse.lsp4j.jsonrpc.services.JsonRequest;

import java.util.concurrent.CompletableFuture;

public interface Client {

    /**
     * Send a message back and forth.
     * FIXME: remove this testing method.
     * @param message
     * @return
     */
    @JsonRequest
    CompletableFuture<Hello> helloClient(Hello message);

    class Hello {
        public String message;

        public Hello() {
        }

        public Hello(String message) {
            this.message = message;
        }
    }
}
