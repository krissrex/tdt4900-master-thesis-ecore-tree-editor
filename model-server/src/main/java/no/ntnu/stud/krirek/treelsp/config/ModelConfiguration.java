package no.ntnu.stud.krirek.treelsp.config;

import org.immutables.value.Value;

import java.util.Optional;

@Value.Immutable
public interface ModelConfiguration {

    String languageName();
    Optional<ModelActions> actions();
    Optional<ModelIcons> icons();

}
