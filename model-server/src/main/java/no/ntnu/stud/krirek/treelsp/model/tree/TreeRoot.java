package no.ntnu.stud.krirek.treelsp.model.tree;

import org.immutables.value.Value;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

@Value.Immutable
public interface TreeRoot {

    @NotNull String id();
    @Nullable TreeNode rootNode();
    @NotNull ActionConfiguration actions();
    @NotNull HierarchyConfiguration hierarchy();
    @Nullable IconConfiguration icons();
}
