<template>
  <button @click.stop="onClicked">{{ action.name }}</button>
</template>

<script lang="ts">
import { Action } from "treedocumentmodel";
import Vue, { PropType } from "vue";
export default Vue.extend({
  props: {
    action: {
      type: Object as PropType<Action>,
    },
  },

  methods: {
    onClicked(): void {
      this.$emit("click", { action: this.action });
    },
  },
});
</script>
