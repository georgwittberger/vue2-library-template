<template>
  <button
    class="action-button"
    :class="`action-button--${variant}`"
    v-on="$listeners"
  >
    <!-- @slot Default slot for button caption -->
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ActionButtonVariant } from './ActionButton.model';

/**
 * Action button component.
 */
export default defineComponent({
  name: 'ActionButton',
  props: {
    /**
     * Button style variant.
     */
    variant: {
      type: String as PropType<ActionButtonVariant>,
      default: ActionButtonVariant.default,
    },
  },
});
</script>

<style scoped>
.action-button {
  border-style: solid;
  border-radius: 2px;
  border-width: 1px;
  padding: 8px 16px;
  cursor: pointer;
}
.action-button--primary {
  background-color: #156abf;
  border-color: #156abf;
  color: #fff;
}
.action-button--secondary {
  background-color: #fff;
  border-color: #156abf;
  color: #156abf;
}
.action-button--default {
  background-color: #fff;
  border-color: #666;
  color: #666;
}
</style>
