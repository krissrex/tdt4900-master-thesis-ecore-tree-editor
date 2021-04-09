#!/bin/bash

# Start from the root folder.
# Requirements:
# - npm
# - vsce
# - dependencies already downloaded (npm install)

## Commented out because it broke tree-editor-frontend for some reason
echo "Building Tree Document Model library..."
cd "tree-document-model-js"
npm run build || { echo 'tree-document-model-js build failed' ; exit 1; }
cd ..

echo "Building frontend webview..."
cd tree-editor-frontend
npm run build || { echo 'tree-editor-frontend build failed' ; exit 1; }
# I've seen this build fail after recompiling tree-document-model-js.
# https://cli.vuejs.org/guide/troubleshooting.html#symbolic-links-in-node-modules
# To fix it: reinstall with
# npm uninstall treedocumentmodel
# npm install -S file:../tree-document-model-js
cd ..

DIST="vscode-ecore-tree-editor-extension/tree-editor-webview-contents/dist"
echo "Deleting old frontend dist: $DIST"
rm -vrf "$DIST" || { echo 'deleting dist failed' ; exit 1; }
echo "Copying in new frontend dist"
cp -r "tree-editor-frontend/dist" "$DIST" || { echo 'copying dist failed' ; exit 1; }

echo "Building vscode extension"
cd "vscode-ecore-tree-editor-extension"
npx vsce package  || { echo 'bundling package failed' ; exit 1; }

echo "Install the extension from the vsix:"
ls -1 --human-readable ecore-tree-editor-*.vsix 