package no.ntnu.stud.krirek.treelsp.config;

import no.ntnu.stud.krirek.treelsp.model.tree.Action;
import no.ntnu.stud.krirek.treelsp.model.tree.TreeNode;
import org.immutables.gson.Gson;
import org.immutables.value.Value;

import java.util.List;
import java.util.Map;

/**
 * Allows specifying what actions are available on different model elements.
 * <p>
 * The application can have a set of pre-defined {@link Action#id() action IDs} that can be specified as available on a given node type.
 */
@Value.Immutable
public
interface ModelActions {
    /**
     * A list of {@link Action#id() action IDs} that are always available.
     */
    List<String> defaultActionbarActions();

    /**
     * A mapping from {@link TreeNode#type() node type} to a list of available {@link Action#id() action IDs} for that type.
     * <p>
     * For example, a {@code "EClass"} or {@code "Organization"} could be allowed to trigger an action for creating a dynamic instance.
     */
    Map<String, List<String>> nodeActions();
}
