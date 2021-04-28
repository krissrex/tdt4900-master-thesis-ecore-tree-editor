package no.ntnu.stud.krirek.treelsp.model.tree;

import org.immutables.value.Value;

@Value.Immutable
public interface EditorState {
    boolean selected();
    boolean collapsed();
}
