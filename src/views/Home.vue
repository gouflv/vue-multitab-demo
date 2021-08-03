<template>
  <div class="home">
    <h1>Home</h1>

    <div>
      <div class="num">Count: {{ count }}</div>
      <button @click="add">+</button>
      <button @click="subtract">-</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const count = ref(0)

    function add() {
      count.value += 1
    }

    function subtract() {
      count.value -= 1
    }

    return {
      count,
      add,
      subtract
    }
  }
});
</script>
