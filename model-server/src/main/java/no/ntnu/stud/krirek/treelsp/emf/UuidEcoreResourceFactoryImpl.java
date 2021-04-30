package no.ntnu.stud.krirek.treelsp.emf;

import org.eclipse.emf.common.util.URI;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.resource.Resource;
import org.eclipse.emf.ecore.resource.impl.ResourceFactoryImpl;
import org.eclipse.emf.ecore.xmi.XMLResource;
import org.eclipse.emf.ecore.xmi.impl.EcoreResourceFactoryImpl;
import org.eclipse.emf.ecore.xmi.impl.URIHandlerImpl;
import org.eclipse.emf.ecore.xmi.impl.XMIResourceImpl;
import org.jetbrains.annotations.Nullable;

import java.util.Map;

/**
 * Enables UUIDs on the objects.
 * The UUID is only stored in the {@link XMLResource}, so you have to use
 * {@link EObject#eResource()} and cast it to {@link XMLResource}, then call {@link XMLResource#getID(EObject)}.
 * Alternatively, use {@link #getId(EObject)}.
 */
public class UuidEcoreResourceFactoryImpl extends EcoreResourceFactoryImpl {

    public static @Nullable String getId(EObject object) {
        if (object == null) {
            return null;
        }

        final Resource resource = object.eResource();
        if (resource instanceof XMLResource) {
            return ((XMLResource) resource).getID(object);
        }

        return null;
    }

    @Override
    public Resource createResource(URI uri) {
        /**
         * Modified to use UUID.
         *
         * Copyright (c) 2002-2007 IBM Corporation and others.
         * All rights reserved.   This program and the accompanying materials
         * are made available under the terms of the Eclipse Public License v2.0
         * which accompanies this distribution, and is available at
         * http://www.eclipse.org/legal/epl-v20.html
         *
         * Contributors:
         *   IBM - Initial API and implementation
         */

        XMLResource result =
                new XMIResourceImpl(uri)
                {
                    @Override
                    protected boolean useIDs()
                    {
                        return eObjectToIDMap != null || idToEObjectMap != null;
                    }

                    // Begin-modification
                    @Override
                    protected boolean useUUIDs() {
                        return true; // FIXME: still not working
                    }
                    // End-modification
                };
        result.setEncoding("UTF-8");
        // Begin-modification
        // Initialize the maps by getting them.
        result.getIDToEObjectMap();
        result.getEObjectToIDMap();
        // End-modification

        if ("genmodel".equals(uri.fileExtension()))
        {
            result.getDefaultLoadOptions().put(XMLResource.OPTION_RECORD_UNKNOWN_FEATURE, Boolean.TRUE);
        }

        result.getDefaultSaveOptions().put(XMLResource.OPTION_USE_ENCODED_ATTRIBUTE_STYLE, Boolean.TRUE);
        result.getDefaultSaveOptions().put(XMLResource.OPTION_LINE_WIDTH, 80);
        result.getDefaultSaveOptions().put(XMLResource.OPTION_URI_HANDLER, new URIHandlerImpl.PlatformSchemeAware());
        return result;
    }
}
