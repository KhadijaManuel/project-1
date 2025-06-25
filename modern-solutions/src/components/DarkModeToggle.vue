<template>
  <div class="flex items-center">
    <label class="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" v-model="isDarkMode" @change="toggleDarkMode" class="sr-only" aria-label="Toggle dark mode" />
      <div class="w-11 h-6 bg-gray-200 rounded-full shadow-inner"></div>
      <div
        class="absolute w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ease-in-out"
        :class="{ 'transform translate-x-5': isDarkMode }"
      ></div>
    </label>
    <span class="ml-2 text-gray-700 dark:text-gray-300">{{ isDarkMode ? 'Dark Mode' : 'Light Mode' }}</span>
  </div>
</template>

<script>
export default {
  name: 'DarkModeToggle',
  data() {
    return {
      isDarkMode: localStorage.getItem('darkMode') === 'true',
    };
  },
  created() {
    this.applyTheme();
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem('darkMode', this.isDarkMode.toString());
      this.applyTheme();
    },
    applyTheme() {
      if (this.isDarkMode) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    },
  },
};
</script>


<style scoped>
body {
  transition: background-color 0.3s ease;
}
</style>
