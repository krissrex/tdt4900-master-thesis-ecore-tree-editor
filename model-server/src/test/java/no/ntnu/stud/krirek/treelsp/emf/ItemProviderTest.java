package no.ntnu.stud.krirek.treelsp.emf;

import org.eclipse.emf.common.util.URI;
import org.eclipse.emf.ecore.*;
import org.eclipse.emf.ecore.resource.Resource;
import org.eclipse.emf.ecore.resource.ResourceSet;
import org.eclipse.emf.edit.provider.IItemPropertyDescriptor;
import org.eclipse.emf.edit.provider.ItemPropertyDescriptor;
import org.eclipse.emf.edit.provider.ReflectiveItemProvider;
import org.eclipse.emf.edit.provider.ReflectiveItemProviderAdapterFactory;
import org.eclipse.emf.edit.provider.resource.ResourceItemProvider;
import org.eclipse.emf.edit.provider.resource.ResourceItemProviderAdapterFactory;
import org.eclipse.emf.edit.provider.resource.ResourceSetItemProvider;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import java.util.Collection;
import java.util.List;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;

public class ItemProviderTest {


    @Test @Disabled("Experimental testing")
    void itemProviderUsageTest() throws Exception {
        // Given
        final ResourceSet resourceSet = EcoreToTreeDocumentModelMapperTest.loadModel();
        final Resource resource = resourceSet.getResources().get(0);

        // When
        // What is the actual order here? Do we create the factory or provider first? Bad API...
        final ReflectiveItemProvider reflectiveItemProvider = new ReflectiveItemProvider(new ReflectiveItemProviderAdapterFactory());
        final ResourceItemProviderAdapterFactory resourceItemProviderAdapterFactory = new ResourceItemProviderAdapterFactory();
        // There is also some Ecore-specific providers in org.eclipse.emf.ecore.provider: https://download.eclipse.org/modeling/emf/emf/javadoc/2.11/org/eclipse/emf/ecore/provider/package-summary.html


        // This factory is quite pointless. Just use the concrete types' constructor directly.
        // Perhaps the editingDomain has something useful.
        final ResourceSetItemProvider resourceSetItemAdapter = (ResourceSetItemProvider) resourceItemProviderAdapterFactory.createAdapter(resourceSet);
        final ResourceItemProvider resourceItemProvider = (ResourceItemProvider) resourceItemProviderAdapterFactory.createAdapter(resource);

        final String resourceSetText = resourceSetItemAdapter.getText(resourceSet);

        final String resourceText = resourceItemProvider.getText(resource);
        final Object image = resourceItemProvider.getImage(resource);
        final Collection<?> resourceChildren = resourceItemProvider.getChildren(resource);

        final EPackage myEPackage = (EPackage) resourceChildren.iterator().next();
        final String packageText = reflectiveItemProvider.getText(myEPackage);
        final Object packageImage = reflectiveItemProvider.getImage(myEPackage);
        // The property descriptors are fields like name, nsuri etc that would go in EMF-Forms.
        // Also has (poor) property descriptions like ("The ESuper Package feature of type EPackage"
        // and image jar-uris (#staticImage).
        final List<IItemPropertyDescriptor> packagePropertyDescriptors = reflectiveItemProvider.getPropertyDescriptors(myEPackage);
        final List<String> packagePropertyDisplayNames = packagePropertyDescriptors.stream().map(item -> item.getDisplayName(item)).collect(Collectors.toList());
        // The TestClass, MyEnum, MyData and Circular.
        final Collection<?> packageChildren = reflectiveItemProvider.getChildren(myEPackage);

        final EClass testClass = (EClass) packageChildren.toArray()[0];
        final Collection<?> testClassChildren = reflectiveItemProvider.getChildren(testClass);

        // This has a child of Circular type. It is called "circular" because its EReference child has EType=Circular.
        final EClass circularClass = (EClass) packageChildren.toArray()[3];
        // Might want to use EClassItemProvider, but I haven't found it on maven.
        final String circularText = reflectiveItemProvider.getText(circularClass);
        final Collection<?> circularChildren = reflectiveItemProvider.getChildren(circularClass);

        final EReference circularReference = (EReference) circularChildren.toArray()[0];
        final String circularReferenceText = reflectiveItemProvider.getText(circularReference);
        // Shoould be empty.
        final Collection<?> circularReferenceChildren = reflectiveItemProvider.getChildren(circularReference);


        // Then
        assertThat(resourceSetText).isEqualTo("Resource Set");
        assertThat(resourceText).isEqualTo("./test-model/MyEcore.ecore");
        assertThat(image).isInstanceOf(URI.class);
        assertThat(((URI) image).path()).isEqualTo("/icons/full/obj16/Resource.gif");
        assertThat(((URI) image).scheme()).isEqualTo("jar");


        final String start = Pattern.quote("jar:file:///");
        final String end = Pattern.quote("/.m2/repository/org/eclipse/emf/org.eclipse.emf.edit/2.16.0/org.eclipse.emf.edit-2.16.0.jar!/icons/full/obj16/Resource.gif#ecore");
        final Pattern imageJarPathPattern = Pattern.compile(start + "(.*)" + end); // The .* tries to match e.g. C:/Users/krirek
        assertThat(((URI) image).toString()).matches(imageJarPathPattern);

        assertThat(resourceChildren).hasSize(1);
        assertThat(packageText).isEqualTo("EPackage MyEcore");
        assertThat(packageImage).isInstanceOf(URI.class);
        assertThat(((URI) packageImage).path()).isEqualTo("/icons/full/obj16/Item.gif");
        assertThat(packagePropertyDescriptors).hasSize(5);
        assertThat(packagePropertyDisplayNames).containsExactlyInAnyOrder("Name", "Ns URI", "Ns Prefix", "EFactory Instance", "ESuper Package");
        assertThat(packageChildren).hasSize(4);

        assertThat(testClassChildren).hasAtLeastOneElementOfType(EAnnotation.class);
        assertThat(testClassChildren).hasSize(7); // 2 annotations, 1 operation, 4 attributes/references

        assertThat(circularText).isEqualTo("EClass Circular");
        assertThat(circularChildren).hasSize(1);
        assertThat(circularChildren).hasAtLeastOneElementOfType(EReference.class);

        assertThat(circularReferenceText).isEqualTo("EReference circularReference");
        assertThat(circularReferenceChildren).hasSize(1);
        assertThat(circularReference.getEType()).isInstanceOf(EClass.class);
        assertThat(circularReference.getEType().getName()).isEqualTo("Circular");
    }
}
