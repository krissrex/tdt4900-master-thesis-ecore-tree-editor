package no.ntnu.stud.krirek.treelsp.emf;


import org.eclipse.emf.common.util.URI;
import org.eclipse.emf.ecore.EcorePackage;
import org.eclipse.emf.ecore.resource.Resource;
import org.eclipse.emf.ecore.resource.ResourceSet;
import org.eclipse.emf.ecore.resource.impl.ResourceSetImpl;

import java.io.File;

public final class EmfTestUtils {

    private EmfTestUtils() {}


    /**
     * @return Absolute path uri, e.g. {@code "file:/C:/dev/model/test-model/"}
     */
    public static String workspaceFileUri() {
        return new File("./test-model/").toURI().toString();
    }

    public static ResourceSet loadMyEcoreModel() throws Exception {
        EcorePackage.eINSTANCE.eClass(); // Register ecore package
        ResourceSet rs = new ResourceSetImpl();
        rs.getResourceFactoryRegistry().getExtensionToFactoryMap().put("ecore", new UuidEcoreResourceFactoryImpl());
        rs.getResourceFactoryRegistry().getExtensionToFactoryMap().put("genmodel", new UuidEcoreResourceFactoryImpl());

        final Resource resource = rs.createResource(URI.createURI("./test-model/MyEcore.ecore"));
        resource.load(null);
        return rs;
    }
}
