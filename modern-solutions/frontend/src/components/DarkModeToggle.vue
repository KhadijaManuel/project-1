<template>
  <div class="flex items-center">
    <label class="relative inline-flex items-center cursor-pointer select-none">
      <input
        type="checkbox"
        v-model="isDarkMode"
        @change="toggleDarkMode"
        class="sr-only"
        aria-label="Toggle dark mode"
      />
      <!-- Track -->
      <div class="w-14 h-7 bg-gray-300 dark:bg-gray-600 rounded-full shadow-inner relative transition-colors duration-300">
        <!-- Sun icon on left -->
        <SunIcon
          class="absolute left-2 top-1.5 w-4 h-4 text-yellow-400 transition-opacity duration-300"
          :class="{ 'opacity-100': !isDarkMode, 'opacity-0': isDarkMode }"
        />
        <!-- Moon icon on right -->
        <MoonIcon
          class="absolute right-2 top-1.5 w-4 h-4 text-gray-700 dark:text-gray-300 transition-opacity duration-300"
          :class="{ 'opacity-100': isDarkMode, 'opacity-0': !isDarkMode }"
        />
      </div>

      <!-- Thumb -->
      <div
        class="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out"
        :class="{ 'translate-x-7': isDarkMode }"
      ></div>
    </label>
  </div>
</template>

<script>
import { SunIcon, MoonIcon } from 'lucide-vue-next';

export default {
  name: 'DarkModeToggle',
  components: { SunIcon, MoonIcon },
  data() {
    return {
      isDarkMode: localStorage.getItem('darkMode') === 'true',
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
    },
  },
};
</script>
