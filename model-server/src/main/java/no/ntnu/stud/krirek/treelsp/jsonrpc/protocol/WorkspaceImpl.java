package no.ntnu.stud.krirek.treelsp.jsonrpc.protocol;

import no.ntnu.stud.krirek.treelsp.emf.ModelTreeController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.URI;

public class WorkspaceImpl implements Workspace {

    Logger log = LoggerFactory.getLogger(WorkspaceImpl.class);

    private ModelTreeController modelTreeController;

    public WorkspaceImpl(ModelTreeController modelTreeController) {
        this.modelTreeController = modelTreeController;
    }

    @Override
    public void setWorkspaceUri(WorkspaceConfig config) {
        log.debug("Set workspace to: {}", config.workspaceUri);
        try {
            final URI uri = URI.create(config.workspaceUri);
            modelTreeController.setWorkspaceUri(uri);
        } catch (IllegalArgumentException ex) {
            // Invalid uri
            log.warn("Workspace uri is invalid: {}", config.workspaceUri);
        }
    }
}
