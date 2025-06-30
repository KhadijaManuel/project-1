<template>
  <aside class="w-64 bg-white dark:bg-gray-800 min-h-screen p-6 flex flex-col justify-between border-r border-gray-200 dark:border-gray-700 transition-colors duration-300">
    <nav>
      <ul class="space-y-5">
        <li>
          <router-link
            to="/dashboard"
            class="group flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            active-class="font-bold text-blue-600 dark:text-blue-400"
          >
            <LayoutDashboardIcon class="w-5 h-5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200" />
            Dashboard
          </router-link>
        </li>
        <li>
          <router-link
            to="/employees"
            class="group flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            active-class="font-bold text-blue-600 dark:text-blue-400"
          >
            <UsersIcon class="w-5 h-5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200" />
            Employees
          </router-link>
        </li>
        <li>
          <router-link
            to="/attendance"
            class="group flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            active-class="font-bold text-blue-600 dark:text-blue-400"
          >
            <CalendarCheckIcon class="w-5 h-5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200" />
            Attendance
          </router-link>
        </li>
        <li>
          <router-link
            to="/payroll"
            class="group flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            active-class="font-bold text-blue-600 dark:text-blue-400"
          >
            <WalletIcon class="w-5 h-5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200" />
            Payroll
          </router-link>
        </li>
        <li>
          <router-link
            to="/leave"
            class="group flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            active-class="font-bold text-blue-600 dark:text-blue-400"
          >
            <PlaneIcon class="w-5 h-5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200" />
            Leave
          </router-link>
        </li>
        <li>
          <router-link
            to="/performance"
            class="group flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            active-class="font-bold text-blue-600 dark:text-blue-400"
          >
            <BarChart2Icon class="w-5 h-5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200" />
            Performance Review
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
import {
  LayoutDashboardIcon,
  UsersIcon,
  CalendarCheckIcon,
  WalletIcon,
  PlaneIcon,
  BarChart2Icon,
} from 'lucide-vue-next';

export default {
  name: "SidebarComp",
  components: {
    LayoutDashboardIcon,
    UsersIcon,
    CalendarCheckIcon,
    WalletIcon,
    PlaneIcon,
    BarChart2Icon,
  },
  data() {
    return {
      isDarkMode: false,
    };
  },
  mounted() {
    this.isDarkMode = localStorage.getItem("darkMode") === "true";
    if (this.isDarkMode) {
      document.documentElement.classList.add("dark");
    }
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      document.documentElement.classList.toggle("dark", this.isDarkMode);
      localStorage.setItem("darkMode", this.isDarkMode);
    },
  },
};
</script>
