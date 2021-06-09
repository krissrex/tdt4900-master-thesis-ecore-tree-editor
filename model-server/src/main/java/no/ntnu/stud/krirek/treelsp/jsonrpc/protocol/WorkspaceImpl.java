package no.ntnu.stud.krirek.treelsp.jsonrpc.protocol;

import no.ntnu.stud.krirek.treelsp.emf.EmfTreeModelController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.URI;
import java.util.Timer;

public class WorkspaceImpl implements Workspace {

    Logger log = LoggerFactory.getLogger(WorkspaceImpl.class);

    private EmfTreeModelController emfTreeModelController;

    public WorkspaceImpl(EmfTreeModelController emfTreeModelController) {
        this.emfTreeModelController = emfTreeModelController;
    }

    @Override
    public void setWorkspaceUri(WorkspaceConfig config) {
        log.debug("Set workspace to: {}", config.workspaceUri);
        final long start = System.currentTimeMillis();
        try {
            emfTreeModelController.setWorkspaceUri(config.workspaceUri);
            final long stop = System.currentTimeMillis();
            log.debug("Done setting workspace to {} in {} s", config.workspaceUri, 0.001f*(stop-start));
        } catch (IllegalArgumentException ex) {
            // Invalid uri
            log.warn("Workspace uri is invalid: {}", config.workspaceUri);
        }
    }
}
