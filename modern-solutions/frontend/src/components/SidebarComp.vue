<template>
  <aside
    :class="[
      'bg-white dark:bg-gray-800 min-h-screen flex flex-col justify-between border-r border-gray-200 dark:border-gray-700 transition-all duration-300',
      isCollapsed ? 'w-16 p-2' : 'w-64 p-4'
    ]"
  >
    <!-- Collapse toggle button -->
    <button
      @click="toggleSidebar"
      class="mb-6 self-end p-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle sidebar"
    >
      <!-- Hamburger icon -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        viewBox="0 0 24 24"
      >
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    </button>

    <nav>
      <ul class="space-y-3">
        <li v-for="item in menuItems" :key="item.path" class="relative group">
          <router-link
            :to="item.path"
            class="flex items-center gap-3 rounded-l-lg px-2 py-3 transition-colors duration-200"
            :class="
              $route.path === item.path
                ? 'bg-blue-800 border-l-4 border-blue-500 font-bold text-white'
                : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
            "
          >
            <!-- ✅ icon will now always show -->
            <component :is="item.icon" class="w-5 h-5 shrink-0 text-current" />
            <span v-if="!isCollapsed">{{ item.label }}</span>
          </router-link>

          <!-- Tooltip when collapsed -->
          <span
            v-if="isCollapsed"
            class="absolute left-full top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          >
            {{ item.label }}
          </span>
        </li>
      </ul>
    </nav>

    <!-- Dark Mode Toggle Button -->
    <button
      @click="toggleDarkMode"
      class="mt-auto flex items-center justify-center p-3 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle Dark Mode"
    >
      <template v-if="isDarkMode">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 text-yellow-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
          />
        </svg>
      </template>
      <template v-else>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 text-yellow-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 3v1m0 16v1m8.485-9H21m-16 0H3m14.142-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z"
          />
        </svg>
      </template>
    </button>
  </aside>
</template>

<script>
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Wallet,
  Plane,
  BarChart2,
} from 'lucide-vue-next'

export default {
  name: 'SidebarComp',
  components: {
    LayoutDashboard,
    Users,
    CalendarCheck,
    Wallet,
    Plane,
    BarChart2,
  },
  data() {
    return {
      isDarkMode: false,
      isCollapsed: false,
      menuItems: [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/employees', label: 'Employees', icon: Users },
        { path: '/attendance', label: 'Attendance', icon: CalendarCheck },
        { path: '/payroll', label: 'Payroll', icon: Wallet },
        { path: '/leave', label: 'Leave', icon: Plane },
        { path: '/performance', label: 'Performance Review', icon: BarChart2 },
      ],
    }
  },
  mounted() {
    this.isDarkMode = localStorage.getItem('darkMode') === 'true'
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark')
    }
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
      document.documentElement.classList.toggle('dark', this.isDarkMode)
      localStorage.setItem('darkMode', this.isDarkMode)
    },
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed
    },
  },
}
</script>

<style>
html {
  transition: background-color 0.5s ease, color 0.5s ease;
}
</style>
