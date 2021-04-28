package no.ntnu.stud.krirek.treelsp.jsonrpc;

import com.google.inject.Guice;
import com.google.inject.Injector;
import no.ntnu.stud.krirek.treelsp.emf.EcoreToTreeDocumentModelMapper;
import no.ntnu.stud.krirek.treelsp.emf.ModelTreeController;
import no.ntnu.stud.krirek.treelsp.jsonrpc.protocol.Client;
import no.ntnu.stud.krirek.treelsp.jsonrpc.protocol.Server;
import no.ntnu.stud.krirek.treelsp.jsonrpc.protocol.ServerImpl;
import no.ntnu.stud.krirek.treelsp.jsonrpc.protocol.WorkspaceImpl;
import org.apache.commons.io.input.CloseShieldInputStream;
import org.eclipse.emfcloud.modelserver.emf.common.ModelController;
import org.eclipse.emfcloud.modelserver.emf.common.ModelRepository;
import org.eclipse.emfcloud.modelserver.emf.common.ModelResourceManager;
import org.eclipse.emfcloud.modelserver.emf.configuration.ServerConfiguration;
import org.eclipse.emfcloud.modelserver.emf.di.DefaultModelServerModule;
import org.eclipse.lsp4j.jsonrpc.Launcher;

import java.io.IOException;
import java.io.InputStream;
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

    /**
     * The launcher will only stop when the InputStream closes.
     * With this proxy stream, we can stop the stream inside Launcher,
     * without stopping the actual {@link System#in} stream.
     */
    private InputStream jsonrpcInputStream;

    public static TLSPJsonRpcServer create() {
        // EMF-Cloud Model Server is created with private field injection,
        // so we need a dependency injection framework (or heavy use of reflection) to instantiate some of the classes.
        final Injector injector = Guice.createInjector(new DefaultModelServerModule());
        ModelRepository repository = injector.getInstance(ModelRepository.class);
        ModelResourceManager resourceManager = injector.getInstance(ModelResourceManager.class);
        ModelController emfModelController = injector.getInstance(ModelController.class);
        ServerConfiguration serverConfiguration = injector.getInstance(ServerConfiguration.class);

        final ModelTreeController modelTreeController = new ModelTreeController(repository, resourceManager,
                emfModelController, serverConfiguration, new EcoreToTreeDocumentModelMapper());
        return new TLSPJsonRpcServer(new ServerImpl(new WorkspaceImpl(modelTreeController), modelTreeController));
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
        final Launcher<Client> serverLauncher = Launcher.createLauncher(server, Client.class, jsonrpcInputStream, System.out);
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

        if (jsonrpcInputStream != null) {
            try {
                jsonrpcInputStream.close();
            } catch (IOException ignored) { }
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
     * @see CloseShieldInputStream CloseShieldInputStream to avoid closing the underlying stream.
     */
    protected InputStream getJsonrpcInputstream() {
        return new CloseShieldInputStream(System.in);
    }

    /**
     * The JSON-RPC launcher has the object used to call the remote client, in {@link Launcher#getRemoteProxy()}.
     * {@link #start()} must be called first.
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
     * @return the server service implementation.
     * @see #start()
     */
    public Server getServer() {
        return server;
    }
}
