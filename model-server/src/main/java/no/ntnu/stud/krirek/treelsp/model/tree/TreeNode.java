package no.ntnu.stud.krirek.treelsp.model.tree;

import org.immutables.value.Value;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.util.List;

@Value.Immutable
public interface TreeNode {

    @NotNull String id();

    /** {@code NodeType} */
    @NotNull String type();

    @Nullable String name();

    @Nullable String documentation();

    @NotNull List<TreeNode> children();

    /**
     * Could be substituted with a {@link String} type too, but hard to express in gson-compatible java without fancy type serializers.
     */
    @Nullable NodeIcon iconOverride();

    @Nullable EditorState editorState();

}
