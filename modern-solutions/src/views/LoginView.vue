<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
    <form @submit.prevent="handleLogin" class="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
      <div class="mb-6 text-center">
        <h1 class="text-2xl font-bold text-blue-700">Login Page</h1>
        <p class="text-gray-600 mt-2">Please enter your credentials to login.</p>
      </div>

      <div class="mb-4">
        <label for="username" class="block text-gray-700 font-medium mb-2">Username</label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="Enter username"
          required
          class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div class="mb-6">
        <label for="password" class="block text-gray-700 font-medium mb-2">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Enter password"
          required
          class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
      >
        Login
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    handleLogin() {
      if (this.username === 'admin' && this.password === '1234') {
        this.$router.push('/dashboard');
      } else {
        alert('Invalid credentials');
      }
    }
  }
};
</script>
