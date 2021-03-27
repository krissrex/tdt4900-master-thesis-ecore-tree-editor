<template>
  <div class="action-bar">
    <h2>Tree editor</h2>
    <div class="actions">
      <button>Action 1</button>
      <button>Action 2</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style scoped>
.action-bar {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.actions {
  display: flex;
  flex-direction: row;
}
</style>
