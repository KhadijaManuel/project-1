<template>
  <aside
    class="w-64 bg-white dark:bg-gray-800 min-h-screen p-6 flex flex-col justify-between transition-colors duration-300"
  >
    <nav>
      <ul>
        <li class="mb-4">
          <router-link
            to="/dashboard"
            class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            active-class="font-bold text-blue-600 dark:text-blue-400"
          >
            Dashboard
          </router-link>
        </li>
        <li class="mb-4">
          <router-link
            to="/employees"
            class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            active-class="font-bold text-blue-600 dark:text-blue-400"
          >
            Employees
          </router-link>
        </li>
        <li class="mb-4">
          <router-link
            to="/attendance"
            class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            active-class="font-bold text-blue-600 dark:text-blue-400"
          >
            Attendance
          </router-link>
        </li>
        <li>
          <router-link
            to="/payroll"
            class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            active-class="font-bold text-blue-600 dark:text-blue-400"
          >
            Payroll
          </router-link>
        </li>
        <li>
          <router-link
            to="/leave"
            class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            active-class="font-bold text-blue-600 dark:text-blue-400"
          >
            Leave
          </router-link>
        </li>
            <li>
          <router-link
            to="/PerformanceReviewTable"
            class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            active-class="font-bold text-blue-600 dark:text-blue-400"
          >
            PerformanceReview
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: "SidebarComp",
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
