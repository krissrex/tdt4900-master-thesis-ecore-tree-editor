package no.ntnu.stud.krirek.treelsp.emf;

import org.eclipse.emf.common.util.URI;
import org.eclipse.emf.ecore.resource.Resource;
import org.eclipse.emf.ecore.resource.impl.ResourceFactoryImpl;
import org.eclipse.emf.ecore.xmi.XMLResource;
import org.eclipse.emf.ecore.xmi.impl.EcoreResourceFactoryImpl;
import org.eclipse.emf.ecore.xmi.impl.URIHandlerImpl;
import org.eclipse.emf.ecore.xmi.impl.XMIResourceImpl;

public class UuidEcoreResourceFactoryImpl extends EcoreResourceFactoryImpl {

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
