package no.ntnu.stud.krirek.treelsp.model.tree;

import org.immutables.gson.Gson;
import org.immutables.value.Value;
import org.jetbrains.annotations.NotNull;

import java.util.List;

@Value.Immutable @Gson.TypeAdapters
public interface TreeDocument {

    @NotNull List<TreeRoot> roots();
}
