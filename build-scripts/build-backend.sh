#!/bin/bash

# Start from the root folder.
# Requirements:
# - mvn (maven, version 3.8)

echo "Building tlsp java server"
cd "model-server"
mvn clean package || { echo "model-server build failed" ; exit 1; }
echo "Copying jar"
cp target/model-server-*.jar "../vscode-ecore-tree-editor-extension/lib/tree_language_server.jar" || { echo "copy of model-server jar failed" ; exit 1; }
cd ..

echo "Backend build done."
