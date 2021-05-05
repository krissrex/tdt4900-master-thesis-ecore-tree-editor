package no.ntnu.stud.krirek.treelsp.config;

import no.ntnu.stud.krirek.treelsp.model.tree.TreeNode;
import org.immutables.gson.Gson;
import org.immutables.value.Value;

import java.util.Map;

/**
 * Allows specifying model mapping rules as a configuration file.
 */
@Value.Immutable
public
interface ModelIcons {

    /**
     * A mapping of model types to icon data uris.
     * <p>
     * The keys are model types like e.g. {@code "EPackage"} or {@code "MyClass"}.
     * <p>
     * A data uri is a base64 encoded image, prefixed with a metadata header like e.g. {@code "data:image/gif;base64,"}.
     *
     * @return Key is {@link TreeNode#type()} and value is a data uri ({@link no.ntnu.stud.krirek.treelsp.model.tree.NodeIcon}).
     */
    Map<String, String> icons();
}
