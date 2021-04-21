package no.ntnu.stud.krirek.treelsp;


import org.eclipse.emfcloud.modelserver.common.EntryPointType;
import org.eclipse.emfcloud.modelserver.emf.common.*;
import org.eclipse.emfcloud.modelserver.emf.di.DefaultModelServerModule;
import org.eclipse.emfcloud.modelserver.emf.launch.CLIBasedModelServerLauncher;
import org.eclipse.emfcloud.modelserver.emf.launch.ModelServerEntryPoint;
import org.eclipse.emfcloud.modelserver.emf.launch.ModelServerStartup;

/**
 * The main entrypoint for connecting with JSON-RPC
 */
public class MainRpc {

    public static void main(String[] args) {
        //TODO: write  some code to launch a JSON-RPC server

        //TODO: make a JSON-RPC interface into something like the ModelServerRoutingV1?

        // https://github.com/eclipse-emfcloud/emfcloud-modelserver/blob/c62bcea4092db4ceac2a398a93041b26cecdaf9e/bundles/org.eclipse.emfcloud.modelserver.emf/src/org/eclipse/emfcloud/modelserver/emf/launch/CLIBasedModelServerLauncher.java#L22
        CLIBasedModelServerLauncher launcher; // = new CLIBasedModelServerLauncher();

        ModelServerEntryPoint entryPoint; // This is the javalin app container

        DefaultModelServerModule di;
        ModelServerRoutingV1 restRoutes;

        DefaultModelRepository repo; // Repository to get model things
        DefaultModelResourceManager resourceManager; // resource sets etc
        DefaultModelValidator validator;
        DefaultModelController modelController; // MVC controller for editing models.

        ModelServerRoutingV1 routing; // The endpoints in javalin are set here. However, most methods are protected. Otherwise our RPC could bridge to something similar to this.
    }
}