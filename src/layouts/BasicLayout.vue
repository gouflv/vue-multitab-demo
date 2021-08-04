<template>
  <div class="basic-layout">
    <aside>
      <ul>
        <router-link tag="li" :to="{ name: 'ExampleHome' }">Home</router-link>
        <router-link tag="li" :to="{ name: 'ExampleAbout'}">About</router-link>
      </ul>
    </aside>
    <main>
      <div class="header">
        <AppTabs />
      </div>

      <keep-alive :include="opened">
        <router-view />
      </keep-alive>
    </main>
  </div>
</template>

<script>
import { computed, defineComponent, toRef } from '@vue/composition-api'
import AppTabs from '../components/AppTabs'
import { tabService } from '../services/TabService'

export default defineComponent( {
  components: { AppTabs },
  setup() {
    const tab = toRef(tabService, 'tabs')

    const opened = computed(() => tab.value.map(t => t.name))

    return {
      opened
    }
  }
})
</script>

<style scoped lang="less">
.basic-layout {
  display: flex;
  height: 100vh;
  background-color: #eee;

  aside {
    flex: 0 0 200px;
    background-color: #555;
    color: #fff;
  }

  main {
    flex: 1;
    padding: 20px;
  }
}
</style>