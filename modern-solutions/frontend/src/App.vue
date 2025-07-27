<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import SidebarComp from './components/SidebarComp.vue'
import LogoutComp from './components/LogoutComp.vue'

const route = useRoute()

// Hide sidebar & navbar on login OR signup page
const isAuthPage = computed(() =>
  route.name === 'login' || route.name === 'signup' || route.path === '/'
)
</script>

<template>
  <div
    id="app"
    class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col"
  >
    <!-- Navbar (hidden on login & signup pages) -->
    <nav
      v-if="!isAuthPage"
      class="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow"
    >
      <div class="text-xl font-bold text-blue-600 dark:text-blue-400">Modern Solutions</div>
      <div class="flex items-center space-x-4">
        <LogoutComp />
      </div>
    </nav>

    <!-- Main layout (with sidebar on all non-auth pages) -->
    <div v-if="!isAuthPage" class="flex flex-1 min-h-0">
      <SidebarComp />
      <main class="flex-1 p-6 overflow-auto">
        <router-view />
      </main>
    </div>

    <!-- Only show login or signup page (no sidebar, no navbar) -->
    <div v-else class="flex-1">
      <router-view />
    </div>
  </div>
</template>
