package no.ntnu.stud.krirek.treelsp.emf;

import com.google.inject.Guice;
import com.google.inject.Injector;
import no.ntnu.stud.krirek.treelsp.config.ModelConfiguration;
import no.ntnu.stud.krirek.treelsp.jsonrpc.ExtraEPackagesModule;
import no.ntnu.stud.krirek.treelsp.model.tree.TreeDocument;
import org.eclipse.emf.common.notify.AdapterFactory;
import org.eclipse.emf.ecore.resource.ResourceSet;
import org.eclipse.emfcloud.modelserver.emf.common.ModelController;
import org.eclipse.emfcloud.modelserver.emf.common.ModelRepository;
import org.eclipse.emfcloud.modelserver.emf.common.ModelResourceManager;
import org.eclipse.emfcloud.modelserver.emf.common.RecordingModelResourceManager;
import org.eclipse.emfcloud.modelserver.emf.configuration.EPackageConfiguration;
import org.eclipse.emfcloud.modelserver.emf.configuration.ServerConfiguration;
import org.eclipse.emfcloud.modelserver.emf.di.DefaultModelServerModule;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import java.io.File;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

public class EmfTreeModelController {

    private final Logger log = LoggerFactory.getLogger(EmfTreeModelController.class);

    private final ModelRepository modelRepository;
    private final ModelResourceManager modelResourceManager;
    private final ModelController emfModelController;
    private final ServerConfiguration serverConfiguration;
    private EcoreToTreeDocumentModelMapper mapper;

    public static class IgnoringModelResourceManager extends RecordingModelResourceManager {
        @Inject
        public IgnoringModelResourceManager(Set<EPackageConfiguration> configurations, AdapterFactory adapterFactory, ServerConfiguration serverConfiguration) {
            super(configurations, adapterFactory, serverConfiguration);
        }

        @Override
        protected boolean isSourceDirectory(File file) {

            final String name = file.getName();
            return !(name.equals("node_modules")
                    || name.equals(".git")
                    || name.equals(".vscode-test")
                    || name.equals(".vscode")
                    || name.equals("out")
                    || name.equals("dist")
                    || name.equals(".model-server")) // TODO make blacklist/whitelist a config option
                    && super.isSourceDirectory(file);
        }
    }

    public static EmfTreeModelController create() {
        // EMF-Cloud Model Server is created with private field injection,
        // so we need a dependency injection framework (or heavy use of reflection) to instantiate some of the classes.
        final Injector injector = Guice.createInjector(new DefaultModelServerModule() {


            @Override
            protected Class<? extends ModelResourceManager> bindModelResourceManager() {
                return IgnoringModelResourceManager.class;
            }
        }, new ExtraEPackagesModule()); // TODO: create 1 injector in the main method, so that singletons are shared.
        /*
        TODO: alter the default model to register custom file extensions for xmi files
         by adding a EPackageConfiguration into the DefaultModelServerModule's multibindings.
         for `resourceSet.getResourceFactoryRegistry().getExtensionToFactoryMap().put("*", new XMIResourceFactoryImpl());`.
         Currently as .ecore and .command (CCommand) by default.
        */

        return injector.getInstance(EmfTreeModelController.class);
    }

    @Inject
    public EmfTreeModelController(ModelRepository modelRepository, ModelResourceManager modelResourceManager,
                                  ModelController emfModelController, ServerConfiguration serverConfiguration,
                                  EcoreToTreeDocumentModelMapper mapper) {
        this.modelRepository = modelRepository;
        this.modelResourceManager = modelResourceManager;
        this.emfModelController = emfModelController;

        this.serverConfiguration = serverConfiguration;
        this.mapper = mapper;
    }

    /**
     * Change the workspace where the model server looks for models.
     *
     * @param uri
     */
    public void setWorkspaceUri(String uri) {
        final boolean success = serverConfiguration.setWorkspaceRoot(uri);
        if (success) {
            modelRepository.initialize();
        } else {
            log.warn("Failed to set workspace uri to {}. Is it malformed or non-existing?", uri);
        }
    }

    /**
     * Get a tree document for the specified model.
     *
     * @param modelFileUri an absolute path file uri, like {@code "file:/C:/myproject/models/MyModel.ecore"} or a workspace-relative filename.
     * @return a mapped {@link TreeDocument} for the model uri.
     * @throws IllegalArgumentException if no model is found at the uri.
     */
    public TreeDocument getTreeDocument(String modelFileUri) {
        log.debug("Getting model for '{}'", modelFileUri);

        if (serverConfiguration.getWorkspaceRootURI() == null || serverConfiguration.getWorkspaceRootURI().isEmpty()) {
            throw new IllegalStateException("Workspace folder must be set first");
        }

        if (modelFileUri.startsWith("file:///")) {
            // Vscode uses this file:// and /c%3A for C: . The emfcloud model server does not handle this well.
            try {
                modelFileUri = new File(new URI(modelFileUri)).toURI().toString();
            } catch (URISyntaxException e) {
                this.log.warn("Unable to convert {} to URI", modelFileUri);
            }
        }

        // The modelResourceManager must get an absolute path `file:/` uri. The uri string is used directly in a map-lookup.
        ResourceSet resourceSet = modelResourceManager.getResourceSet(modelFileUri);
        if (resourceSet == null && !modelFileUri.startsWith("file:/")) {
            // Try to find a model inside the workspace that matches the name.
            String finalModelFileUri = modelFileUri;
            final Optional<String> matchingEntry = serverConfiguration.getWorkspaceEntries() // Lists all files in the workspace
                    .stream()
                    .filter(modelAbsoluteFilePath -> modelAbsoluteFilePath.endsWith(finalModelFileUri))
                    .findFirst();
            if (matchingEntry.isPresent()) {
                final String detectedModelUri = new File(matchingEntry.get()).toURI().toString();
                resourceSet = modelResourceManager.getResourceSet(detectedModelUri);
            }
        }
        if (resourceSet == null) {
            throw new IllegalArgumentException("Failed to get resource: " + modelFileUri);
        }

        // FIXME: clean up config loading, to consturctor etc.
        final no.ntnu.stud.krirek.treelsp.config.ServerConfiguration modelServerConfig = new no.ntnu.stud.krirek.treelsp.config.ServerConfiguration();
        final List<ModelConfiguration> modelConfigurations = modelServerConfig.loadDefaultConfigurations();
        String finalModelFileUri1 = modelFileUri;
        final Optional<ModelConfiguration> languageConfig = modelConfigurations.stream()
                .filter(conf -> finalModelFileUri1.endsWith("." + conf.languageName()))
                .findFirst();
        mapper.setMappingConfig(languageConfig.orElse(null));

        final TreeDocument doc = mapper.map(resourceSet);
        log.debug("Model for '{}' mapped to {} root(s).", modelFileUri, doc.roots().size());
        return doc;
    }

    public List<String> getDetectedModelUris() {
        log.debug("Got {} uris and {} resource sets.", modelResourceManager.getAllLoadedModelURIs().size(), modelResourceManager.getAllLoadedResourceSets().size());
        return modelResourceManager.getAllLoadedModelURIs()
                .stream()
                .map(uri -> uri.toString())
                .collect(Collectors.toList());
    }
}
