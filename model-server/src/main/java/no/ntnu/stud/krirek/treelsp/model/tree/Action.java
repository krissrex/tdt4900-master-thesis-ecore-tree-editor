package no.ntnu.stud.krirek.treelsp.model.tree;

import org.immutables.value.Value;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

@Value.Immutable
public interface Action {

    /** {@code ActionId} */
    @NotNull String id();

    @NotNull String name();

    /** {@code IconDataUri} */
    @Nullable String icon();
}
