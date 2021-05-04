package no.ntnu.stud.krirek.treelsp.jsonrpc.protocol;

import org.eclipse.lsp4j.jsonrpc.Launcher;
import org.eclipse.lsp4j.jsonrpc.services.JsonRequest;

import java.util.concurrent.CompletableFuture;

/**
 * Provides static typing for the remote process, using the {@link Launcher#getRemoteProxy()}.
 *
 * Methods that the vscode extension can implement, so this server can call them over json-rpc.
 * They are implemented in <a href="../vscode-ecore-tree-editor-extension/src/tree-language-server/jsonrpc/VscodeJsonRPCServer.ts">
 *     tree-language-server/jsonrpc/VscodeJsonRPCServer.ts</a> .in the vscode extension.
 *
 * @see Launcher#getRemoteProxy()
 * @see no.ntnu.stud.krirek.treelsp.jsonrpc.TLSPJsonRpcServer
 */
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
