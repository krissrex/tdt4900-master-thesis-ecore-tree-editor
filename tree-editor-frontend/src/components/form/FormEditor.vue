<template>
  <div class="form">
    <h2>Properties</h2>
    <span>Selected node: {{}}</span>
    <form action="#">
      <fieldset>
        <legend>Test attributes</legend>
        <input type="text" name="test" id="test" value="Test" />
        <input type="text" name="testPick" id="test" />
      </fieldset>
      <button>Pick a class</button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  computed: {
    selectedNode() {
      return {
        name: "bob",
      };
    },
  },
});
</script>
