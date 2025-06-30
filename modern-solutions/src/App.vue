<template>
  <div id="app" class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col">
    <!-- Navbar -->
    <nav class="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow">
      <div class="text-xl font-bold text-blue-600 dark:text-blue-400">Modern Solutions</div>
      <DarkModeToggle />
    </nav>

    <!-- Main Layout with Sidebar and Content -->
    <div class="flex flex-1 min-h-0">
      <SidebarComp />

      <main class="flex-1 p-6 overflow-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import SidebarComp from './components/SidebarComp.vue';
import DarkModeToggle from './components/DarkModeToggle.vue';

export default {
  name: 'App',
  components: {
    SidebarComp,
    DarkModeToggle,
  },
};
</script>
