<template>
  <div class="master-detail-layout">
    <div class="top-bar">
      <slot name="top" />
    </div>
    <div class="master">
      <slot name="master" />
    </div>
    <div class="divider" />
    <div class="detail">
      <slot name="detail" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style scoped>
.master-detail-layout {
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: [master-line] 80fr [divider-line] 4px [detail-line] auto;
  grid-template-rows: [top-line] 10fr [main-line] 90fr;
  grid-template-areas:
    "top top top"
    "master divider detail";
  place-items: stretch; /* Completely fill the grid cells*/
  place-content: stretch; /* Let the grid fill its parent */
}

.top-bar {
  grid-area: top;
  background-color: rgb(255, 87, 87); /* FIXME: debug color */
}
.master {
  grid-area: master;
}
.divider {
  grid-area: divider;
  background-color: gray; /* FIXME: debug color */
}
.detail {
  grid-area: detail;
}
</style>
