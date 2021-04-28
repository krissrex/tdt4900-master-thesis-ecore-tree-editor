package no.ntnu.stud.krirek.treelsp.model.tree;

import org.immutables.value.Value;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.util.List;
import java.util.Map;

@Value.Immutable
public interface ActionConfiguration {

    @NotNull List<Action> availableActions();

    /**
     * {@code List<ActionId>}
     */
    @Nullable List<String> defaultAcionbarActions();

    /**
     * {@code Map<ActionId, NodeType>}
     */
    @Nullable Map<String, @NotNull List<String>> nodeActions();
}
