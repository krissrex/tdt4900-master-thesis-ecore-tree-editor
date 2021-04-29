package no.ntnu.stud.krirek.treelsp.emf;

import org.assertj.core.api.Assertions;
import org.eclipse.emf.common.util.EList;
import org.eclipse.emf.common.util.URI;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.resource.Resource;
import org.eclipse.emf.ecore.resource.impl.ResourceSetImpl;
import org.eclipse.emf.ecore.util.EcoreUtil;
import org.eclipse.emf.ecore.xmi.impl.XMIResourceImpl;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Method;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

class UuidEcoreResourceFactoryImplTest {


    @Test
    void loadsWithExtrinsicId() throws Exception{
        // Given
        final ResourceSetImpl resourceSet = new ResourceSetImpl();
        resourceSet.getResourceFactoryRegistry().getExtensionToFactoryMap().put("ecore", new UuidEcoreResourceFactoryImpl());
        final Resource resource = resourceSet.createResource(URI.createURI("./test-model/MyEcore.ecore"));

        // When
        resource.load(null);
        final EList<EObject> contents = resource.getContents();
        final EObject ePackage = contents.get(0);
        final String id = EcoreUtil.getID(ePackage);

        // Then
        assertThat(resource).isInstanceOf(XMIResourceImpl.class);
        assertThat(useUUIDs(resource)).isTrue();

        assertThat(id).isNotNull();
        assertThat(id).isNotBlank();
    }

    static boolean useUUIDs(Resource resource) throws Exception {
        final Method method = resource.getClass().getDeclaredMethod("useUUIDs");
        method.setAccessible(true);
        return (boolean) method.invoke(resource);
    }
}