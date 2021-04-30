package no.ntnu.stud.krirek.treelsp.emf;

import com.google.common.collect.Streams;
import org.eclipse.emf.common.util.EList;
import org.eclipse.emf.common.util.TreeIterator;
import org.eclipse.emf.common.util.URI;
import org.eclipse.emf.ecore.EClassifier;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.EPackage;
import org.eclipse.emf.ecore.resource.Resource;
import org.eclipse.emf.ecore.resource.impl.ResourceSetImpl;
import org.eclipse.emf.ecore.util.EcoreUtil;
import org.eclipse.emf.ecore.xmi.XMLResource;
import org.eclipse.emf.ecore.xmi.impl.XMIResourceImpl;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Method;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;

class UuidEcoreResourceFactoryImplTest {


    @Test
    void loadsWithExtrinsicId() throws Exception {
        // Given
        final ResourceSetImpl resourceSet = new ResourceSetImpl();
        resourceSet.getResourceFactoryRegistry().getExtensionToFactoryMap().put("ecore", new UuidEcoreResourceFactoryImpl());
        final Resource resource = resourceSet.createResource(URI.createURI("./test-model/MyEcore.ecore"));

        // When
        resource.load(null);
        final EList<EObject> contents = resource.getContents();
        final EPackage ePackage = (EPackage) contents.get(0);
        final String id = ((XMLResource) resource).getID(ePackage);
        final String id1 = UuidEcoreResourceFactoryImpl.getId(ePackage);

        final EClassifier myClass = ePackage.getEClassifiers().get(0);
        final String classId = UuidEcoreResourceFactoryImpl.getId(myClass);

        final TreeIterator<Object> allContents = EcoreUtil.getAllContents(resourceSet, true);
        final List<String> allIds = Streams.stream(allContents)
                .map(content -> {
                    if (content instanceof EObject) {
                        return ((XMLResource) resource).getID((EObject) content);
                    } else {
                        System.out.println("Object is not EObject: " + content.getClass().getName());
                        return null;
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());


        // Then
        assertThat(resource).isInstanceOf(XMIResourceImpl.class);
        assertThat(useUUIDs(resource)).isTrue();

        assertThat(id).isNotNull();
        assertThat(id).isEqualTo(id1);

        assertThat(id).isNotEqualTo(classId);
        assertThat(allIds).hasSize(22);
        assertThat(allIds).doesNotHaveDuplicates();

    }

    static boolean useUUIDs(Resource resource) throws Exception {
        final Method method = resource.getClass().getDeclaredMethod("useUUIDs");
        method.setAccessible(true);
        return (boolean) method.invoke(resource);
    }
}