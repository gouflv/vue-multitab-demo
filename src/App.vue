<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { tabService } from './services/TabService'

export default defineComponent({
  setup() {
    return {
      tabService
    }
  }
})
</script>

<style lang="less">
body {
  margin: 0;
}

a {
  color: inherit;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
