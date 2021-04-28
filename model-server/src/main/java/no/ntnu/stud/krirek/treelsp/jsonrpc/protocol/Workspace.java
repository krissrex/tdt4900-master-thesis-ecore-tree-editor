package no.ntnu.stud.krirek.treelsp.jsonrpc.protocol;

import org.eclipse.lsp4j.jsonrpc.services.JsonNotification;
import org.eclipse.lsp4j.jsonrpc.services.JsonSegment;

@JsonSegment("workspace")
public interface Workspace {

    /**
     * Configure the server to look for model files in the specified workspace uri.
     * @param config configuration options like file uri.
     */
    @JsonNotification
    void setWorkspaceUri(WorkspaceConfig config);

    class WorkspaceConfig {
        /**  a file uri, like {@code "file:/C:/Users/krissrex/eclipse-workspace/TreeLanguageServerProtocol/"}. */
        public String workspaceUri;
    }
}
