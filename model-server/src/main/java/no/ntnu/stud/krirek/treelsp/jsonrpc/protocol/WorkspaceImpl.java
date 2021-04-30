package no.ntnu.stud.krirek.treelsp.jsonrpc.protocol;

import no.ntnu.stud.krirek.treelsp.emf.EmfTreeModelController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.URI;

public class WorkspaceImpl implements Workspace {

    Logger log = LoggerFactory.getLogger(WorkspaceImpl.class);

    private EmfTreeModelController emfTreeModelController;

    public WorkspaceImpl(EmfTreeModelController emfTreeModelController) {
        this.emfTreeModelController = emfTreeModelController;
    }

    @Override
    public void setWorkspaceUri(WorkspaceConfig config) {
        log.debug("Set workspace to: {}", config.workspaceUri);
        try {
            final URI uri = URI.create(config.workspaceUri);
            emfTreeModelController.setWorkspaceUri(uri);
        } catch (IllegalArgumentException ex) {
            // Invalid uri
            log.warn("Workspace uri is invalid: {}", config.workspaceUri);
        }
    }
}
