module treelsp.rpc {
    exports no.ntnu.stud.krirek.treelsp;
    opens   no.ntnu.stud.krirek.treelsp;
    exports no.ntnu.stud.krirek.treelsp.jsonrpc;
    opens   no.ntnu.stud.krirek.treelsp.jsonrpc;
    exports no.ntnu.stud.krirek.treelsp.jsonrpc.protocol;
    opens   no.ntnu.stud.krirek.treelsp.jsonrpc.protocol;

    requires org.eclipse.emfcloud.modelserver.emf;
    requires org.eclipse.emfcloud.modelserver.common;
    requires commons.cli;
    requires org.eclipse.lsp4j.jsonrpc;
    requires org.apache.commons.io;
    requires com.google.gson;
}
