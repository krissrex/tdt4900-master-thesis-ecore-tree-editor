<template>
  <div v-if="iconData && icons">
    <img
      v-for="(dataUri, index) in icons"
      :key="index"
      :src="dataUri"
      :data-img="'' + dataUri + '-' + index"
      alt="icon"
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
