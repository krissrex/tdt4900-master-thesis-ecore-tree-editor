<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import {vscodeExtension} from "@/vscode/VscodeExtension"

export default Vue.extend({
  name: "App",
  components: {
    HelloWorld
  },
  mounted() {
    this.$nextTick(() => vscodeExtension.signalReady());
  }
});
</script>

<style href="@/assets/vscode.css"></style>
