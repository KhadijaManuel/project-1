<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-4">
    <form
      @submit.prevent="handleSignup"
      class="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 w-full max-w-sm border border-gray-200 dark:border-gray-700 transition-all duration-300"
    >
      <!-- Header -->
      <div class="mb-6 text-center">
        <h1 class="text-3xl font-extrabold text-blue-700 dark:text-blue-400">Create Account</h1>
        <p class="text-gray-600 dark:text-gray-300 mt-2 text-sm">
          Fill in your details to register.
        </p>
      </div>

      <!-- Username -->
      <div class="mb-5">
        <label for="username" class="block text-gray-700 dark:text-gray-200 font-medium mb-2">Username</label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="Choose a username"
          required
          class="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-lg px-4 py-2 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      <!-- Employee ID -->
      <div class="mb-5">
        <label for="employee_id" class="block text-gray-700 dark:text-gray-200 font-medium mb-2">Employee ID</label>
        <input
          type="text"
          id="employee_id"
          v-model="employee_id"
          placeholder="Enter your Employee ID"
          required
          class="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-lg px-4 py-2 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      <!-- Password -->
      <div class="mb-6">
        <label for="password" class="block text-gray-700 dark:text-gray-200 font-medium mb-2">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Choose a password"
          required
          class="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-lg px-4 py-2 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
      >
        Sign Up
      </button>

      <!-- Success / Error -->
      <p
        v-if="successMessage"
        class="text-green-600 dark:text-green-400 mt-4 text-sm text-center"
      >
        {{ successMessage }}
      </p>
      <p
        v-if="signupError"
        class="text-red-600 dark:text-red-400 mt-4 text-sm text-center"
      >
        {{ signupError }}
      </p>

      <!-- Back to Login -->
      <div class="text-center mt-4">
        <router-link
          to="/"
          class="text-blue-600 hover:underline dark:text-blue-400 text-sm"
        >
          Already have an account? Log in
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SignupPage',
  data() {
    return {
      username: '',
      employee_id: '',
      password: '',
      signupError: '',
      successMessage: ''
    };
  },
  methods: {
    async handleSignup() {
      this.signupError = '';
      this.successMessage = '';

      try {
        const res = await fetch('http://localhost:5000/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
            employee_id: this.employee_id
          })
        });

        const data = await res.json();

        if (res.ok) {
          this.successMessage = 'User registered successfully! You can now log in.';
          this.username = '';
          this.password = '';
          this.employee_id = '';
        } else {
          this.signupError = data.message || 'Registration failed.';
        }
      } catch (err) {
        this.signupError = 'Server error. Please try again.';
      }
    }
  }
};
</script>

<style scoped>
/* All styling handled by Tailwind classes */
</style>
