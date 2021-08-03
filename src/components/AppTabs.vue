<template>
  <div class="app-tabs">
    <div class="tab-item">
      <div class="label">{{ 'Home' }}</div>
      <button>Reload</button>
      <button>Close</button>
    </div>
    <div class="tab-item">
      <div class="label">{{ 'About' }}</div>
      <button>Reload</button>
      <button>Close</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({

})
</script>

<style lang="less" scoped>
.app-tabs {
  display: flex;
  padding-bottom: 20px;
  border-bottom: 1px solid #555;

  .tab-item {
    display: flex;
    padding: 8px;
    margin-right: 1em;
    border: 1px solid #777;

    .label {
      padding: 0 10px;
    }

    button {
      margin: 0 4px;
    }
  }
}
</style>