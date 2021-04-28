module treelsp.rpc {
    exports no.ntnu.stud.krirek.treelsp;
    opens   no.ntnu.stud.krirek.treelsp;
    exports no.ntnu.stud.krirek.treelsp.emf;
    opens   no.ntnu.stud.krirek.treelsp.emf;
    exports no.ntnu.stud.krirek.treelsp.jsonrpc;
    opens   no.ntnu.stud.krirek.treelsp.jsonrpc;
    exports no.ntnu.stud.krirek.treelsp.jsonrpc.protocol;
    opens   no.ntnu.stud.krirek.treelsp.jsonrpc.protocol;
    exports no.ntnu.stud.krirek.treelsp.model;
    opens   no.ntnu.stud.krirek.treelsp.model;
    exports no.ntnu.stud.krirek.treelsp.model.tree;
    opens no.ntnu.stud.krirek.treelsp.model.tree;

    requires commons.cli;

    requires org.eclipse.lsp4j.jsonrpc;
    requires org.apache.commons.io;

    requires org.eclipse.emfcloud.modelserver.emf;
    requires org.eclipse.emfcloud.modelserver.common;
    requires com.google.gson;
    requires com.google.guice;
    requires javax.inject;
    requires org.eclipse.emf.common;
    requires org.eclipse.emf.ecore;
    requires org.eclipse.emf.ecore.xmi;
    requires org.eclipse.emf.edit;
    requires org.eclipse.emf.transaction;
    requires org.eclipse.emf.ecore.change;
    requires emfjson.jackson;
    requires com.fasterxml.jackson.databind;
    requires kotlin.stdlib;

    requires org.immutables.value;
    requires com.google.errorprone.annotations;
    requires com.github.spotbugs.annotations;
    requires jsr305;
    requires com.google.common;

    requires org.jetbrains.annotations;

    requires org.slf4j;
    requires jul.to.slf4j;
}
