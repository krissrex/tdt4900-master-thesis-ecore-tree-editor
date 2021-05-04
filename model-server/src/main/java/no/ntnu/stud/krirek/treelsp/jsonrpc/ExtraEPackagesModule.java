package no.ntnu.stud.krirek.treelsp.jsonrpc;

import com.google.inject.AbstractModule;
import com.google.inject.multibindings.ProvidesIntoSet;
import org.eclipse.emf.codegen.ecore.genmodel.GenModelPackage;
import org.eclipse.emf.ecore.EcorePackage;
import org.eclipse.emfcloud.modelserver.emf.common.DefaultModelResourceManager;
import org.eclipse.emfcloud.modelserver.emf.configuration.EPackageConfiguration;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

/**
 * Adds more {@link org.eclipse.emf.ecore.EPackage}s and file extensions to the dependency injection system.
 * <p>
 * They are injected into the {@link org.eclipse.emfcloud.modelserver.emf.common.DefaultModelResourceManager#registerExtensions(EPackageConfiguration)}
 * etc, which looks for file extensions.
 *
 * Packages are registered in {@link DefaultModelResourceManager#initialize()}.
 *
 */
public class ExtraEPackagesModule extends AbstractModule {

    @ProvidesIntoSet
    EPackageConfiguration provideGenmodelPackage() {
        return new GenmodelPackageConfiguration();
    }

    @ProvidesIntoSet
    EPackageConfiguration provideXmiExtension() {
        return new EcoreXmiPackageConfiguration();
    }

    /**
     * Registers the {@link GenModelPackage} for {@code ".genmodel"} files.
     * <p>
     * This package must be registered even if not used, as the resource manager already detects the {@code ".genmodel"} files by default
     * and tries to load them. If GenModel is not registered, the model load fails.
     * <p>
     * Not sure why genmodel is loaded automatically. It <i>could</i> be because of the genmodel annotations.
     */
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

    /**
     * Registers the {@code ".xmi"} file extension for EMF Dynamic Instance files.
     */
    public static class EcoreXmiPackageConfiguration implements EPackageConfiguration {

        @Override
        public String getId() {
            // the method seems unused, so null should be fine for now.
            // Otherwise, maybe use the EcorePackage uuid (or merge this extension into that EPackageConfiguration)
            return null;
        }

        @Override
        public Collection<String> getFileExtensions() {
            return List.of(".xmi");
        }

        @Override
        public void registerEPackage() {
            EcorePackage.eINSTANCE.eClass();
        }
    }


}
