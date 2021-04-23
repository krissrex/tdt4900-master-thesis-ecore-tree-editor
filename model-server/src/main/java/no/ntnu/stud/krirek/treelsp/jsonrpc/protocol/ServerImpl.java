package no.ntnu.stud.krirek.treelsp.jsonrpc.protocol;

import java.util.Date;
import java.util.concurrent.CompletableFuture;

public class ServerImpl implements Server {

    //TODO: make a JSON-RPC interface into something like the ModelServerRoutingV1?
    public ServerImpl() {
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
