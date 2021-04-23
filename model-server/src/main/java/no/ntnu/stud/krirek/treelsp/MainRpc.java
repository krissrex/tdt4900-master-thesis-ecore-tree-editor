package no.ntnu.stud.krirek.treelsp;


import no.ntnu.stud.krirek.treelsp.jsonrpc.TLSPJsonRpcServer;
import no.ntnu.stud.krirek.treelsp.jsonrpc.protocol.Client;
import org.apache.commons.cli.*;
import org.eclipse.emfcloud.modelserver.common.EntryPointType;
import org.eclipse.emfcloud.modelserver.emf.common.*;
import org.eclipse.emfcloud.modelserver.emf.di.DefaultModelServerModule;
import org.eclipse.emfcloud.modelserver.emf.launch.CLIBasedModelServerLauncher;
import org.eclipse.emfcloud.modelserver.emf.launch.ModelServerEntryPoint;
import org.eclipse.emfcloud.modelserver.emf.launch.ModelServerStartup;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Future;

/**
 * The main entrypoint for connecting with JSON-RPC
 */
public class MainRpc {

    public static final String MESSAGE_JSONRPC_READY = "[JSON-RPC] Server is ready.";

    public static void main(String[] args) {
        CommandLine options = parseArgs(args);

        if (options.hasOption("h")) {
            String header = "Tree Language Server Protocol over JSON-RPC.\nOptions:";
            String footer = "\nPlease report issues at github.";
            new HelpFormatter().printHelp("model-server.jar", header, getCliOptions(), footer, true);
            System.exit(0);
            return;
        }

        // TODO: start JSON-RPC here
        final TLSPJsonRpcServer jsonRpcServer = new TLSPJsonRpcServer();
        jsonRpcServer.start();

        if (options.hasOption("r")) {
            // Echo a custom ready message. Must be done after the server is actually ready and listening for input.
            System.out.println(options.getOptionValue("r"));
        } else {
            System.out.println(MESSAGE_JSONRPC_READY);
        }

        final Client client = jsonRpcServer.getLauncher().getRemoteProxy();
        final CompletableFuture<Client.Hello> helloResponse = client.helloClient(new Client.Hello("Vscode extension"));
        helloResponse.handleAsync((hello, throwable) -> {
            System.err.println("Got response hello: " + hello.message);
            return null;
        });

        final Future<Void> onStopped = jsonRpcServer.getOnStopped();
        while (!onStopped.isDone()) {
            try {
                synchronized (onStopped) {
                    onStopped.wait();
                }
            } catch (InterruptedException ignored) {
            }
        }
        System.err.println("Server stopped.");

        // TODO: implement with these

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

    protected static CommandLine parseArgs(String[] args) {
        CommandLineParser cliParser = new DefaultParser();

        try {
            return cliParser.parse(getCliOptions(), args);
        } catch (ParseException e) {
            e.printStackTrace();
            System.exit(1);
        }
        return null;
    }

    protected static Options getCliOptions() {
        Options options = new Options();

        options.addOption("h", "help", false, "Print help text and exit.");
        options.addOption(Option.builder("u").longOpt("ui-schema")
                .required(false)
                .desc("A relative path to a folder in the workspace with a ui schema")
                .argName("dirName")
                .optionalArg(false)
                .build());

        options.addOption(Option.builder("r").longOpt("ready-message")
                .required(false)
                .desc("A custom message to echo when the server is ready for JSON-RPC.")
                .argName("message")
                .optionalArg(false)
                .build());

        return options;
    }
}