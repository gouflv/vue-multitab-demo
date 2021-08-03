<template>
  <div class="basic-layout">
    <aside>
      <ul>
        <router-link tag="li" :to="{ name: 'UHome' }">Home</router-link>
        <router-link tag="li" :to="{ name: 'UAbout'}">About</router-link>
      </ul>
    </aside>
    <main>
      <div class="header">
        <AppTabs />
      </div>
      <router-view />
    </main>
  </div>
</template>

<script>
import AppTabs from '../components/AppTabs'

export default {
  components: { AppTabs }
}
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