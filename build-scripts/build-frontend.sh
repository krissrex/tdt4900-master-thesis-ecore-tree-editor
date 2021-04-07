#!/bin/bash

# Start from the root folder.
# Requirements:
# - npm
# - vsce
# - dependencies already downloaded (npm install)

echo "Building frontend webview..."
cd tree-editor-frontend
npm run build
cd ..

DIST="vscode-ecore-tree-editor-extension/tree-editor-webview-contents/dist"
echo "Deleting old frontend dist: $DIST"
rm -vrf "$DIST"
echo "Copying in new frontend dist"
cp -r "tree-editor-frontend/dist" "$DIST"

echo "Building vscode extension"
cd "vscode-ecore-tree-editor-extension"
npx vsce package

echo "Install the extension from the vsix:"
ls -1 --human-readable ecore-tree-editor-*.vsix 