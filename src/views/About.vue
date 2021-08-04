<template>
  <div>
    <h1>About</h1>

    <div>
      <Button @click="onClick">Force reload Home Tab</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useTabService } from '../use/useTabService'

export default defineComponent({
  setup() {
    const {reload} = useTabService()

    function onClick() {
      reload('ExampleHome')
    }

    return {
      onClick
    }
  }
})
</script>
