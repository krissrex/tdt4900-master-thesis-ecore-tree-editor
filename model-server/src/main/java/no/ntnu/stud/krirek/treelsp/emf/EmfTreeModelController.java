package no.ntnu.stud.krirek.treelsp.emf;

import no.ntnu.stud.krirek.treelsp.model.tree.TreeDocument;
import org.eclipse.emf.common.command.BasicCommandStack;
import org.eclipse.emf.ecore.EcorePackage;
import org.eclipse.emf.ecore.resource.ResourceSet;
import org.eclipse.emf.ecore.util.EcoreAdapterFactory;
import org.eclipse.emf.ecore.xmi.impl.XMIResourceFactoryImpl;
import org.eclipse.emf.edit.domain.AdapterFactoryEditingDomain;
import org.eclipse.emfcloud.modelserver.emf.common.ModelController;
import org.eclipse.emfcloud.modelserver.emf.common.ModelRepository;
import org.eclipse.emfcloud.modelserver.emf.common.ModelResourceManager;
import org.eclipse.emfcloud.modelserver.emf.configuration.ServerConfiguration;

import java.net.URI;

public class EmfTreeModelController {

    private final ModelRepository modelRepository;
    private final ModelResourceManager modelResourceManager;
    private final ModelController emfModelController;
    private final ServerConfiguration serverConfiguration;
    private EcoreToTreeDocumentModelMapper mapper;

    public EmfTreeModelController(ModelRepository modelRepository, ModelResourceManager modelResourceManager,
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
        final ResourceSet resourceSet = modelResourceManager.getResourceSet(modelFileUri);
        final TreeDocument doc = mapper.map(resourceSet);
        return doc;
    }
}
