<template>
  <div id="app">
    <master-detail-layout>
      <action-bar slot="top" />
      <tree-editor slot="master" />
      <form-editor slot="detail" />
    </master-detail-layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import MasterDetailLayout from "./components/MasterDetailLayout.vue";
import ActionBar from "./components/actions/ActionBar.vue";
import TreeEditor from "./components/tree/TreeEditor.vue";
import FormEditor from "./components/form/FormEditor.vue";
import { vscodeExtension } from "@/vscode/VscodeExtension";

export default Vue.extend({
  name: "App",
  components: {
    MasterDetailLayout,
    ActionBar,
    TreeEditor,
    FormEditor,
  },
  mounted() {
    this.$nextTick(() => vscodeExtension.signalReady());
  },
});
</script>

<style src="@/assets/reset.css"></style>
<style src="@/assets/vscode.css"></style>

<style>
html,
body {
  width: 100%;
  height: 100%;
  display: block;
}
</style>

<style scoped>
#app {
  width: 100%;
  height: 100%;
  position: relative;
  display: block;
  margin: 0;
}
</style>
