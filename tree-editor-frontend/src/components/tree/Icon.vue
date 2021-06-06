<template>
  <div v-if="iconData && icons" class="icon-container">
    <img
      v-for="(dataUri, index) in icons"
      :key="index"
      :src="dataUri"
      :data-img="'' + dataUri + '-' + index"
      alt="icon"
      class="icon"
    />
  </div>
</template>

<script lang="ts">
import { IconDataUri, NodeIcon } from "treedocumentmodel";
import Vue, { PropType } from "vue";
export default Vue.extend({
  props: {
    iconData: {
      type: Object as PropType<NodeIcon>,
      required: false,
    },
  },
  computed: {
    icons(): IconDataUri[] {
      return this.iconData?.icons ?? [];
    },
  },
});
</script>

<style scoped>
.icon-container {
  display: grid;
}
.icon {
  /* Put all icons in the same cell to stack them. */
  grid-column: 1;
  grid-row: 1;
}
</style>
