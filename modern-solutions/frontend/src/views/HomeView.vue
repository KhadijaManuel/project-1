<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <img alt="Vue logo" src="../assets/logo.png" class="w-48 h-auto mb-4">
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>

import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>

<style scoped>

</style>
