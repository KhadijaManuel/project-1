<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
    <EmployeesCards />
  </div>
</template>

<script>
import EmployeesCards from './EmployeesCards.vue';

export default {
  name: 'FlipCard',
  components: {
    EmployeesCards
  }
};
</script>
