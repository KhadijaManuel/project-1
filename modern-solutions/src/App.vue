<template>
  <div id="app">
    <nav class="flex justify-between items-center p-6 bg-white dark:bg-gray-800">
      <div>
        <router-link to="/" class="mr-4 text-gray-800 dark:text-gray-200">Home</router-link>
        <router-link to="/payRoll" class="mr-4 text-gray-800 dark:text-gray-200">PayRoll</router-link>
        <router-link to="/attendance" class="text-gray-800 dark:text-gray-200">Attendance</router-link>
      </div>
      <DarkModeToggle />
    </nav>
    <router-view />
  </div>
</template>

<script>
import DarkModeToggle from './components/DarkModeToggle.vue'; // path for darkmode file 

export default {
  name: 'App',
  components: {
    DarkModeToggle,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
