<template>
  <div class="flex items-center p-4">
    <label class="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        v-model="isDarkMode"
        @change="toggleDarkMode"
        class="sr-only"
        aria-label="Toggle dark mode"
      />
      <div class="w-11 h-6 bg-gray-300 rounded-full shadow-inner dark:bg-gray-600"></div>
      <div
        class="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out"
        :class="{ 'translate-x-5': isDarkMode }"
      ></div>
    </label>
    <span class="ml-3 text-gray-800 dark:text-gray-200 select-none">
      {{ isDarkMode ? 'Dark Mode' : 'Light Mode' }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'DarkModeToggle',
  data() {
    return {
      isDarkMode: localStorage.getItem('darkMode') === 'true'
    };
  },
  mounted() {
    this.applyTheme();
  },
  methods: {
    toggleDarkMode() {
      localStorage.setItem('darkMode', this.isDarkMode);
      this.applyTheme();
    },
    applyTheme() {
      document.documentElement.classList.toggle('dark', this.isDarkMode);
    }
  }
};
</script>
