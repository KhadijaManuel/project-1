<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-8">
    <h2 class="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400">Performance Reviews</h2>

    <!-- Pass reviews as 'employees' prop -->
    <EmployeesCards :employees="reviews" />
  </div>
</template>

<script>
import EmployeesCards from "@/components/EmployeesCards.vue";

export default {
  components: {
    EmployeesCards,
  },
  data() {
    return {
      reviews: [],
    };
  },
  async mounted() {
    try {
      const response = await fetch("/data/performance.json");
      const data = await response.json();
      this.reviews = data.performanceReviews;
    } catch (error) {
      console.error("Error loading performance reviews:", error);
    }
  },
};
</script>
