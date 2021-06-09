package no.ntnu.stud.krirek.treelsp.jsonrpc.protocol;

import no.ntnu.stud.krirek.treelsp.emf.EmfTreeModelController;
import no.ntnu.stud.krirek.treelsp.model.tree.TreeDocument;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Date;
import java.util.List;
import java.util.concurrent.CompletableFuture;

public class ServerImpl implements Server {

    private no.ntnu.stud.krirek.treelsp.jsonrpc.protocol.Workspace workspace;
    private EmfTreeModelController emfTreeModelController;

    private static final Logger log = LoggerFactory.getLogger(ServerImpl.class);

    //TODO: make a JSON-RPC interface into something like the ModelServerRoutingV1?
    public ServerImpl(Workspace workspace, EmfTreeModelController emfTreeModelController) {
        this.workspace = workspace;
        this.emfTreeModelController = emfTreeModelController;
    }

    @Override
    public CompletableFuture<InitializeResult> initialize(InitializeParams params) {
        log.info("Got initialize");
        return CompletableFuture.completedFuture(new InitializeResult());
    }

    @Override
    public CompletableFuture<Object> shutdown() {
        log.info("Shutting down");
        return CompletableFuture.completedFuture(new Object());
    }

    @Override
    public void exit() {
        log.info("Exiting");
        System.exit(0);
    }

    @Override
    public CompletableFuture<Ping> ping() {
        Ping ping = new Ping();
        ping.receivedAtTimestamp = new Date().getTime();
        log.debug("Got ping at {}", ping.receivedAtTimestamp);
        return CompletableFuture.completedFuture(ping);
    }

    @Override
    public Workspace workspace() {
        return workspace;
    }

    @Override
    public CompletableFuture<TreeDocument> getModel(ModelRequest modelRequest) {
        log.debug("Getting model at uri {}", modelRequest.modelFileUri);

        try {
            final TreeDocument treeDocument = emfTreeModelController.getTreeDocument(modelRequest.modelFileUri);
            log.debug("Successfully got model at uri {}", modelRequest.modelFileUri);
            return CompletableFuture.completedFuture(treeDocument);
        } catch (Exception ex) {
            log.debug("Failed to get model at {}", modelRequest.modelFileUri);
            return CompletableFuture.failedFuture(ex);
        }
    }

    @Override
    public CompletableFuture<List<String>> getDetectedModelUris() {
        return CompletableFuture.completedFuture(emfTreeModelController.getDetectedModelUris());
    }
}
