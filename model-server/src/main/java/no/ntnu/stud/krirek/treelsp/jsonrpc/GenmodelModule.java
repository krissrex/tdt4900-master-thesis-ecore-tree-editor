package no.ntnu.stud.krirek.treelsp.jsonrpc;

import com.google.inject.AbstractModule;
import com.google.inject.multibindings.ProvidesIntoSet;
import org.eclipse.emf.codegen.ecore.genmodel.GenModelPackage;
import org.eclipse.emfcloud.modelserver.emf.configuration.EPackageConfiguration;

import java.util.Collection;
import java.util.Collections;

public class GenmodelModule extends AbstractModule {



    @ProvidesIntoSet
    EPackageConfiguration provideGenmodelPackage() {
        return new GenmodelPackageConfiguration();
    }

    public static class GenmodelPackageConfiguration implements EPackageConfiguration {
        @Override
        public String getId() {
            return GenModelPackage.eINSTANCE.getNsURI();
        }

        @Override
        public Collection<String> getFileExtensions() {
            return Collections.singletonList(".genmodel");
        }

        @Override
        public void registerEPackage() {
            GenModelPackage.eINSTANCE.eClass();
        }
    }
}
