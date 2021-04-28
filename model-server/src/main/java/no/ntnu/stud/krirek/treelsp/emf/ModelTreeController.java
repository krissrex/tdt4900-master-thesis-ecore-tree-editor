package no.ntnu.stud.krirek.treelsp.emf;

import no.ntnu.stud.krirek.treelsp.model.tree.TreeDocument;
import org.eclipse.emfcloud.modelserver.emf.common.ModelController;
import org.eclipse.emfcloud.modelserver.emf.common.ModelRepository;
import org.eclipse.emfcloud.modelserver.emf.common.ModelResourceManager;
import org.eclipse.emfcloud.modelserver.emf.configuration.ServerConfiguration;

import java.net.URI;

public class ModelTreeController {

    private final ModelRepository modelRepository;
    private final ModelResourceManager modelResourceManager;
    private final ModelController emfModelController;
    private final ServerConfiguration serverConfiguration;
    private EcoreToTreeDocumentModelMapper mapper;

    public ModelTreeController(ModelRepository modelRepository, ModelResourceManager modelResourceManager,
                               ModelController emfModelController, ServerConfiguration serverConfiguration,
                               EcoreToTreeDocumentModelMapper mapper) {
        this.modelRepository = modelRepository;
        this.modelResourceManager = modelResourceManager;
        this.emfModelController = emfModelController;

        this.serverConfiguration = serverConfiguration;
        this.mapper = mapper;
    }

    public void setWorkspaceUri(URI uri) {
        serverConfiguration.setWorkspaceRoot(uri.toString());
        modelRepository.initialize();
    }

    public TreeDocument getTreeDocument(String modelFileUri) {
        return null;
    }
}
