package no.ntnu.stud.krirek.treelsp.jsonrpc.protocol;

import java.util.Date;
import java.util.concurrent.CompletableFuture;

public class ServerImpl implements Server {

    //TODO: make a JSON-RPC interface into something like the ModelServerRoutingV1?
    public ServerImpl() {
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

    }

    @Override
    public CompletableFuture<Ping> ping() {
        Ping ping = new Ping();
        ping.receivedAtTimestamp = new Date().getTime();
        return CompletableFuture.completedFuture(ping);
    }

    @Override
    public Workspace workspace() {
        return new WorkspaceImpl();
    }
}
