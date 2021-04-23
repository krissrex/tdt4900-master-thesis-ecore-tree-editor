package no.ntnu.stud.krirek.treelsp.jsonrpc;

import no.ntnu.stud.krirek.treelsp.jsonrpc.protocol.Client;
import no.ntnu.stud.krirek.treelsp.jsonrpc.protocol.Server;
import no.ntnu.stud.krirek.treelsp.jsonrpc.protocol.ServerImpl;
import org.apache.commons.io.input.CloseShieldInputStream;
import org.eclipse.lsp4j.jsonrpc.Launcher;

import java.io.FilterInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.concurrent.Future;

/**
 * Configures and starts the JSON-RPC server.
 * <p>
 * Use {@link #getOnStopped()} for a {@link Future} that resolves when the server has stopped.
 * The server will stop when {@link System#in} is closed.
 */
public class TLSPJsonRpcServer {

    private Server server;
    private Launcher<Client> launcher;
    private Future<Void> onStopped;

    /**
     * The launcher will only stop when the InputStream closes.
     * With this proxy stream, we can stop the stream inside Launcher,
     * without stopping the actual {@link System#in} stream.
     */
    private CloseShieldInputStream stoppableSystemIn;

    public void start() {
        // Use stderr because stdout is reserved for json-rpc.
        if (onStopped != null && !onStopped.isDone()) {
            System.err.println("Server is already running");
            return;
        }

        // Documentation for lsp4j-jsonrpc: https://github.com/eclipse/lsp4j/blob/master/documentation/jsonrpc.md

        server = getServerImpl();
        stoppableSystemIn = new CloseShieldInputStream(System.in);
        final Launcher<Client> serverLauncher = Launcher.createLauncher(server, Client.class, stoppableSystemIn, System.out);
        onStopped = serverLauncher.startListening();
        this.launcher = serverLauncher;
        System.err.println("Listening to stdin for JSON-RPC");
    }

    /**
     * Stops the launcher.
     */
    public void stop() {
        if (onStopped == null || onStopped.isDone()) {
            return;
        }

        if (stoppableSystemIn != null) {
            stoppableSystemIn.close();
            stoppableSystemIn = null;
        }
    }


    protected Server getServerImpl() {
        return new ServerImpl();
    }

    public Launcher<Client> getLauncher() {
        return launcher;
    }

    public Future<Void> getOnStopped() {
        return onStopped;
    }

    public Server getServer() {
        return server;
    }
}
