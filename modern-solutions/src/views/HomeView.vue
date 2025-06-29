<template>
  <div class="bg-image">
    <div class="bg-text">
      <h1>Login Page</h1>
      <p>Please enter your credentials to login.</p>
    </div>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="userEmail">email:</label>
        <input v-model="userEmail" type="text" id="userEmail" placeholder="email" required>
      </div>
      <div>
        <label for="password">password:</label>
        <input v-model="password" type="password" id="password" placeholder="password" required>
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
      <div v-if="error" style="color: red;">{{ error }}</div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      userEmail: '',
      password: '',
      error: ''
    };
  },
  methods: {
    handleLogin() {
      if (!this.userEmail || !this.password) {
        this.error = 'Please enter your email and password';
      } else {
        this.error = '';
        // Simulate successful login
        this.$router.push('/dashboard');
      }
    }
  }
}
</script>

<style scoped>
form {
  width: 300px;
  margin: 0 auto;
}

div {
  margin-bottom: 15px;
}

div label {
  display: block;
  margin-bottom: 5px;
}
</style>