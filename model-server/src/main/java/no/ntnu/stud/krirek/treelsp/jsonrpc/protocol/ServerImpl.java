package no.ntnu.stud.krirek.treelsp.jsonrpc.protocol;

import no.ntnu.stud.krirek.treelsp.emf.EmfTreeModelController;
import no.ntnu.stud.krirek.treelsp.model.tree.TreeDocument;

import java.util.Date;
import java.util.concurrent.CompletableFuture;

public class ServerImpl implements Server {

    private no.ntnu.stud.krirek.treelsp.jsonrpc.protocol.Workspace workspace;
    private EmfTreeModelController emfTreeModelController;

    //TODO: make a JSON-RPC interface into something like the ModelServerRoutingV1?
    public ServerImpl(Workspace workspace, EmfTreeModelController emfTreeModelController) {
        this.workspace = workspace;
        this.emfTreeModelController = emfTreeModelController;
    }

    @Override
    public CompletableFuture<InitializeResult> initialize(InitializeParams params) {
        return CompletableFuture.completedFuture(new InitializeResult());
    }

    @Override
    public CompletableFuture<Object> shutdown() {
        return CompletableFuture.completedFuture(new Object());
    }

    @Override
    public void exit() {
        System.exit(0);
    }

    @Override
    public CompletableFuture<Ping> ping() {
        Ping ping = new Ping();
        ping.receivedAtTimestamp = new Date().getTime();
        return CompletableFuture.completedFuture(ping);
    }

    @Override
    public Workspace workspace() {
        return workspace;
    }

    @Override
    public CompletableFuture<TreeDocument> getModel(ModelRequest modelRequest) {
        final TreeDocument treeDocument = emfTreeModelController.getTreeDocument(modelRequest.modelFileUri);
        return CompletableFuture.completedFuture(treeDocument);
    }
}
