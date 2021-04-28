package no.ntnu.stud.krirek.treelsp.model.tree;

import org.immutables.value.Value;
import org.jetbrains.annotations.NotNull;

import java.util.Map;

@Value.Immutable
public interface IconConfiguration {
    @NotNull Map<String, NodeIcon> icons();
}
