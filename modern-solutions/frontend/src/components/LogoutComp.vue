<template>
  <button
    @click="logout"
    class="bg-red-600 hover:bg-red-700 text-white font-semibold py-1.5 px-4 rounded transition"
    title="Logout"
  >
    Logout
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function logout() {

  // Redirect to login page
  router.push({ name: 'login' }) // routher.push is just making the page move to a new navlink 
}
</script>
