package no.ntnu.stud.krirek.treelsp.jsonrpc.protocol;

public class WorkspaceImpl implements Workspace {

    @Override
    public void setWorkspaceUri(WorkspaceConfig config) {
        System.err.println("Set workspace to " + config.workspaceUri);
    }
}
