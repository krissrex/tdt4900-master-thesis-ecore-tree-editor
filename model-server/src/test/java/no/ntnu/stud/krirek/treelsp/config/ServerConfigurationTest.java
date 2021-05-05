package no.ntnu.stud.krirek.treelsp.config;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.assertj.core.api.Assertions.assertThat;

class ServerConfigurationTest {


    @Test
    void loadsDefaultConfigurationsForEcore() throws Exception {
        // Given
        final ServerConfiguration serverConfig = new ServerConfiguration();

        // When
        final List<ModelConfiguration> defaultConfigs = serverConfig.loadDefaultConfigurations();
        final ModelConfiguration ecoreConfig = defaultConfigs.stream()
                .filter(config -> "ecore".equals(config.languageName()))
                .findFirst()
                .orElse(null);

        // Then
        assertThat(defaultConfigs).isNotEmpty();
        assertThat(ecoreConfig).isNotNull();
        assertThat(ecoreConfig.icons()).isPresent();
        assertThat(ecoreConfig.actions()).isPresent();

        final ModelIcons modelIcons = ecoreConfig.icons().get();
        assertThat(modelIcons.icons()).containsKeys(
                "EAnnotation",
                "EAttribute",
                "EClass",
                "EDataType",
                "EEnum",
                "EEnumLiteral",
                "EFactory",
                "EGenericElementType",
                "EGenericException",
                "EGenericSuperType",
                "EGenericType",
                "EGenericTypeArgument",
                "EGenericWildcard",
                "EObject",
                "EOperation",
                "EPackage",
                "EParameter",
                "EReference",
                "EStringToStringMapEntry",
                "ETypeParameter"
        );
        assertThat(modelIcons.icons().values()).doesNotContainNull();

        final ModelActions modelActions = ecoreConfig.actions().get();
        assertThat(modelActions.defaultActionbarActions()).hasSize(1); //FIXME set correct size
        assertThat(modelActions.nodeActions()).containsKeys(); //FIXME: add keys
        assertThat(modelActions.nodeActions().get("EPackage")).containsExactlyInAnyOrder("ecore:create-genmodel"); //FIXME: add actions
        fail("Not done with actions test code");
    }
}