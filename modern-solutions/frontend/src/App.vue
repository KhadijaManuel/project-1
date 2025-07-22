<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import SidebarComp from './components/SidebarComp.vue'
import DarkModeToggle from './components/DarkModeToggle.vue'
import LogoutComp from './components/LogoutComp.vue'

const route = useRoute()
const isLoginPage = computed(() => route.name === 'login' || route.path === '/')
</script>

<template>
  <div
    id="app"
    class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col"
  >
    <!-- Navbar (hidden on login page) -->
    <nav
      v-if="!isLoginPage"
      class="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow"
    >
      <div class="text-xl font-bold text-blue-600 dark:text-blue-400">Modern Solutions</div>
      <div class="flex items-center space-x-4">
        <LogoutComp />
      </div>
    </nav>

    <!-- Main layout (with sidebar on all non-login pages) -->
    <div v-if="!isLoginPage" class="flex flex-1 min-h-0">
      <SidebarComp />

      <main class="flex-1 p-6 overflow-auto">
        <router-view />
      </main>
    </div>

    <!-- Only show the login page (no sidebar, no navbar) -->
    <div v-else class="flex-1">
      <router-view />
    </div>
  </div>
</template>
  