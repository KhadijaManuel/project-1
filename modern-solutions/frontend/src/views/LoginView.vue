<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-4">
    <form
      @submit.prevent="handleLogin"
      class="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 w-full max-w-sm border border-gray-200 dark:border-gray-700 transition-all duration-300"
    >
     
      <div class="mb-6 text-center">
        <h1 class="text-3xl font-extrabold text-blue-700 dark:text-blue-400">Welcome Back</h1>
        <p class="text-gray-600 dark:text-gray-300 mt-2 text-sm">
          Please enter your credentials to login.
        </p>
      </div>

     
      <div class="mb-5">
        <label for="username" class="block text-gray-700 dark:text-gray-200 font-medium mb-2">Username</label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="Enter username"
          required
          class="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-lg px-4 py-2 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      
      <div class="mb-6">
        <label for="password" class="block text-gray-700 dark:text-gray-200 font-medium mb-2">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Enter password"
          required
          class="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-lg px-4 py-2 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

    
      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
      >
        Login
      </button>

      
      <button
        type="button"
        @click="$router.push('/signup')"
        class="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
      >
        Create an Account
      </button>

     
      <p
        v-if="loginError"
        class="text-red-600 dark:text-red-400 mt-4 text-sm text-center animate-pulse"
      >
        {{ loginError }}
      </p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
      loginError: ''
    }
  },
  methods: {
    async handleLogin() {
      try {
        const response = await fetch('http://localhost:5000/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });

        const data = await response.json();

        if (!response.ok) {
          this.loginError = data.message || 'Login failed';
          return;
        }

        localStorage.setItem('authToken', data.token);
        this.$router.push('/dashboard');
      } catch (err) {
        console.error('Login error:', err);
        this.loginError = 'Server error. Please try again later.';
      }
    }
  }
}
</script>

<style scoped>
</style>
