package no.ntnu.stud.krirek.treelsp.model.tree;

import org.immutables.value.Value;
import org.jetbrains.annotations.NotNull;

import java.util.List;
import java.util.Map;

@Value.Immutable
public interface HierarchyConfiguration {
    /**
     * {@code Map<NodeType, List<NodeType>>}
     */
    @NotNull Map<String, @NotNull List<String>> allowedChildren();

}
