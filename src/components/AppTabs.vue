<template>
  <div class="app-tabs">
    <template v-for="tab in tabs">
      <div
          :key="tab.name"
          class="tab-item"
          :class="{ active: tab.name === active.name }"
          @click="onClick(tab.name)"
      >
        <div class="label">{{ tab.title }}</div>
        <button @click.stop="reload(tab.name)">Reload</button>
        <button @click.stop="close(tab.name)">Close</button>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef } from '@vue/composition-api'
import { tabService } from '../services/TabService'

export default defineComponent({
  setup() {
    const tabs = toRef(tabService, 'tabs')
    const active = toRef(tabService, 'active')

    function reload(name: string) {
      tabService.reload(name)
    }

    function close(name: string) {
      tabService.close(name)
    }

    function onClick(name: string) {
      tabService.setActive(name)
    }

    return {
      tabs,
      active,
      reload,
      close,
      onClick
    }
  }
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

    &.active {
      background-color: #fff;
    }
  }
}
</style>