package no.ntnu.stud.krirek.treelsp.config;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import kotlin.NotImplementedError;
import no.ntnu.stud.krirek.treelsp.model.tree.ActionConfiguration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class ServerConfiguration {

    public static final String CONFIG_FOLDER = ".model-server";
    public static final String LOG_FOLDER = "logs";

    public static final String MODEL_CONFIG_FOLDER = "model";
    public static final String MODEL_CONFIG_ACTIONS_FILENAME = "actions.json";
    public static final String MODEL_CONFIG_ICONS_FILENAME = "icons.json";

    private static final Logger log = LoggerFactory.getLogger(ServerConfiguration.class);
    private final Gson gson;

    public ServerConfiguration() {

        this.gson = new GsonBuilder()
                .registerTypeAdapterFactory(new GsonAdaptersConfig())
                .create();
    }

    public List<ModelConfiguration> loadDefaultConfigurations() {
        try {
            final String modelConfigsRoot = CONFIG_FOLDER + "/" + MODEL_CONFIG_FOLDER;
            final URL internalConfigs = getClass().getClassLoader().getResource(modelConfigsRoot);
            if (internalConfigs == null) {
                throw new RuntimeException("Cannot find internal configuration folder at " + modelConfigsRoot);
            }

            final Path internalConfigPath = Paths.get(internalConfigs.toURI());
            if (!Files.isDirectory(internalConfigPath)) {
                throw new RuntimeException("The path " + internalConfigPath.toString() + " is not a directory.");
            }
            final Stream<Path> modelFolders = Files.list(internalConfigPath).filter(Files::isDirectory);
            final Stream<ConfigPaths> modelConfigPaths = modelFolders.map(folder -> {
                String languageName = folder.getFileName().toString();
                final Path iconPath = folder.resolve(MODEL_CONFIG_ICONS_FILENAME);
                final Path actionPath = folder.resolve(MODEL_CONFIG_ACTIONS_FILENAME);
                return new ConfigPaths(languageName, actionPath, iconPath);
            });

            final List<ModelConfiguration> modelConfigs = modelConfigPaths.map(configs -> ImmutableModelConfiguration.builder()
                    .languageName(configs.folderName)
                    .icons(iconsFromPath(configs.iconsFile))
                    .actions(actionsFromPath(configs.actionsFile))
                    .build())
                    .collect(Collectors.toList());

            return modelConfigs;
        } catch (IOException | URISyntaxException e) {
            log.error("Failed to load default model configs", e);
            return Collections.emptyList();
        }

    }

    protected Optional<ModelActions> actionsFromPath(Path actionsFilePath) {
        return readConfigFile(actionsFilePath).map(text -> gson.fromJson(text, ModelActions.class));
    }

    protected Optional<ModelIcons> iconsFromPath(Path iconFilePath) {
        return readConfigFile(iconFilePath).map(text -> gson.fromJson(text, ModelIcons.class));
    }

    /**
     * @param path a file path
     * @return an optional with the text contents of the file, or empty.
     */
    protected Optional<String> readConfigFile(Path path) {
        if (!isFile(path)) {
            return Optional.empty();
        }

        try {
            final String iconConfig = Files.readString(path);
            return Optional.ofNullable(iconConfig);
        } catch (IOException e) {
            log.error("Failed to load icon config from {}", path, e);
            return Optional.empty();
        }
    }

    protected boolean isFile(Path iconFilePath) {
        return iconFilePath != null && Files.exists(iconFilePath) && Files.isRegularFile(iconFilePath);
    }

    protected static class ConfigPaths {
        public final String folderName;
        public final Path actionsFile;
        public final Path iconsFile;

        public ConfigPaths(String folderName, Path actionsFile, Path iconsFile) {
            this.folderName = folderName;
            this.actionsFile = actionsFile;
            this.iconsFile = iconsFile;
        }
    }
}
