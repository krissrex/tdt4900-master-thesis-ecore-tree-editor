package no.ntnu.stud.krirek.treelsp.jsonrpc;

import no.ntnu.stud.krirek.treelsp.emf.EmfTreeModelController;
import no.ntnu.stud.krirek.treelsp.jsonrpc.protocol.Client;
import no.ntnu.stud.krirek.treelsp.jsonrpc.protocol.Server;
import no.ntnu.stud.krirek.treelsp.jsonrpc.protocol.ServerImpl;
import no.ntnu.stud.krirek.treelsp.jsonrpc.protocol.WorkspaceImpl;
import no.ntnu.stud.krirek.treelsp.model.tree.GsonAdaptersTree;
import org.apache.commons.io.input.CloseShieldInputStream;
import org.eclipse.lsp4j.jsonrpc.Launcher;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.Future;

/**
 * Configures and starts the JSON-RPC server.
 * <p>
 * Use {@link #getOnStopped()} for a {@link Future} that resolves when the server has stopped.
 * The server will stop when {@link System#in} is closed.
 */
public class TLSPJsonRpcServer implements AutoCloseable {

    private Server server;
    private Launcher<Client> launcher;
    private Future<Void> onStopped;

    private static final Logger log = LoggerFactory.getLogger(TLSPJsonRpcServer.class);

    /**
     * The launcher will only stop when the InputStream closes.
     * With this proxy stream, we can stop the stream inside Launcher,
     * without stopping the actual {@link System#in} stream.
     */
    private InputStream jsonrpcInputStream;

    public static TLSPJsonRpcServer create() {
        final EmfTreeModelController emfTreeModelController = EmfTreeModelController.create();
        final ServerImpl server = new ServerImpl(new WorkspaceImpl(emfTreeModelController), emfTreeModelController);
        return new TLSPJsonRpcServer(server);
    }

    public TLSPJsonRpcServer(Server server) {
        this.server = server;
    }

    public void start() {
        // Use stderr because stdout is reserved for json-rpc.
        if (onStopped != null && !onStopped.isDone()) {
            System.err.println("Server is already running");
            return;
        }

        // Documentation for lsp4j-jsonrpc: https://github.com/eclipse/lsp4j/blob/master/documentation/jsonrpc.md

        jsonrpcInputStream = getJsonrpcInputstream();


        final Launcher.Builder<Client> clientBuilder = new Launcher.Builder<>();
        clientBuilder
                .setLocalService(server)
                .setRemoteInterface(Client.class)
                .setInput(jsonrpcInputStream)
                .setOutput(System.out)
                .configureGson(gsonBuilder -> gsonBuilder.registerTypeAdapterFactory(new GsonAdaptersTree()));

        try {
            final String traceFilePath = ".model-server/logs/tlsp-jsonrpc.trace";
            PrintWriter trace = new PrintWriter(traceFilePath, StandardCharsets.UTF_8);
            clientBuilder.traceMessages(trace);
            log.info("Tracing to {}", traceFilePath);
        } catch (Exception ignored) {
        }
        launcher = clientBuilder.create();
        onStopped = launcher.startListening();


        System.err.println("Listening to stdin for JSON-RPC");
    }

    /**
     * Stops the launcher.
     * Not needed if the underlying inputstream was closed (e.g. from a parent process).
     */
    public void stop() {
        if (onStopped == null || onStopped.isDone()) {
            return;
        }

        if (jsonrpcInputStream != null) {
            try {
                jsonrpcInputStream.close();
            } catch (IOException ignored) {
            }
            jsonrpcInputStream = null;
        }
    }

    @Override
    public void close() throws Exception {
        this.stop();
    }

    /**
     * Provide a {@link InputStream} for the {@link Launcher} to listen to incoming JSON-RPC messages.
     * This will be {@link InputStream#close() closed} when {@link #stop()} is called.
     *
     * @see CloseShieldInputStream CloseShieldInputStream to avoid closing the underlying stream.
     */
    protected InputStream getJsonrpcInputstream() {
        return new CloseShieldInputStream(System.in);
    }

    /**
     * The JSON-RPC launcher has the object used to call the remote client, in {@link Launcher#getRemoteProxy()}.
     * {@link #start()} must be called first.
     *
     * @return the launcher instance.
     * @see #start()
     */
    public Launcher<Client> getLauncher() {
        return launcher;
    }

    public Future<Void> getOnStopped() {
        return onStopped;
    }

    /**
     * The service used to receive JSON-RPC calls.
     * {@link #start()} must be called first.
     *
     * @return the server service implementation.
     * @see #start()
     */
    public Server getServer() {
        return server;
    }
}
