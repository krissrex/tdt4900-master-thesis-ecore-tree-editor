# VSCode Ecore Tree Editor


## Components

1. VSCode extension (`vscode-ecore-tree-editor-extension`)
2. Tree Editor frontend (`tree-editor-frontend`)
3. Tree Language Server (`model-server`)
4. Tree Document model js-library (`tree-docment-model-js`)
5. VSCode and Webview RPC js-library (`vscode-webview-tree-editor-rpc`)

The VSCode extension embeds and presents the Tree Editor frontend. The extension talks over the Tree Language Server Protocol (TLSP) to the Tree Language Server, which in turn asks the Ecore Model Server to do the actual work on models and files.

![plantuml 0](https://www.plantuml.com/plantuml/proxy?cache=no&idx=0&src=https://raw.githubusercontent.com/krissrex/tdt4900-master-thesis-ecore-tree-editor/master/Readme.md)

<details><summary>PlantUML code</summary>

```plantuml
@startuml
[Tree Editor frontend] as TEf
[VSCode extension] as VSCEx
[EMF Tree Language Server] as TLS
[Tree Document model js-library] as TDMlib
[VSCode and Webview RPC js-library] as VSCWVRPC

artifact "compiled frontend js" as cfs

TEf -right-> cfs : compiles to
TEf --> VSCWVRPC : imports
TEf --> TDMlib : imports
VSCEx --> VSCWVRPC : imports
VSCEx --> TDMlib : imports
VSCEx -left-> cfs : webview
VSCEx <-> TLS : TLSP/JSON-RPC
@enduml
```
</details>

## Generic and specific domains
Some parts are generic to all domains suited for a Tree Editor. The rest is specific to Eclipse Modeling Framework (EMF).

Generic components should not contain *any* references to EMF or Ecore.

![Domains](./documentation/domains.png)
