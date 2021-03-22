<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <master-detail-layout>
      <div slot="top">Top</div>
      <div slot="master">Master</div>
      <div slot="detail">Detail</div>
    </master-detail-layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import MasterDetailLayout from "./components/MasterDetailLayout.vue";
import {vscodeExtension} from "@/vscode/VscodeExtension"

export default Vue.extend({
  name: "App",
  components: {
    MasterDetailLayout
  },
  mounted() {
    this.$nextTick(() => vscodeExtension.signalReady());
  }
});
</script>

<style src="@/assets/reset.css"></style>
<style src="@/assets/vscode.css"></style>
