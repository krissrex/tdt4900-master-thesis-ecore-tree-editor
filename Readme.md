# VSCode Ecore Tree Editor


## Components

1. VSCode extension (`vscode-ecore-tree-editor-extension`)
2. Tree Editor frontend (`tree-editor-frontend`)
3. Tree Language Server (`nil/TODO`)
4. Ecore Model Server (`model-server`)
5. Tree Document model js-library (`tree-docment-model-js`)

The VSCode extension embeds and presents the Tree Editor frontend. The extension talks over the Tree Language Server Protocol (TLSP) to the Tree Language Server, which in turn asks the Ecore Model Server to do the actual work on models and files.

![plantuml 0](http://www.plantuml.com/plantuml/proxy?cache=no&idx=0&src=https://raw.githubusercontent.com/krissrex/tdt4900-master-thesis-ecore-tree-editor/master/Readme.md)

<details><summary>PlantUML code</summary>

```plantuml
@startuml
[VSCode extension] as VSCEx
[Tree Editor frontend] as TEf
[Tree Language Server] as TLS
[Ecore Model Server] as EMS
[Tree Document model js-library] as TDMlib

artifact "compiled frontend js" as cfs

TEf -> cfs : compiles to
VSCEx --> cfs : webview
VSCEx <-> TLS : TLSP
TLS <-> EMS : REST, Websocket
TDMlib <-- TEf : imports
@enduml
```
</details>

## Generic and specific domains
Some parts are generic to all domains suited for a Tree Editor. The rest is specific to Eclipse Modeling Framework (EMF).

Generic components should not contain *any* references to EMF or Ecore.

![Domains](./documentation/domains.png)
