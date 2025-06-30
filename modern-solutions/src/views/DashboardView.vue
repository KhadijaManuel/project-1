<template>
  <div class="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
    <!-- Main content -->
    <main class="flex-1 p-8 overflow-y-auto space-y-6">
      
      <!-- Placeholder Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CardComp>
          <div class="h-24 flex items-center justify-center text-gray-400 dark:text-gray-500">
            Card 1 (Coming Soon)
          </div>
        </CardComp>
        <CardComp>
          <div class="h-24 flex items-center justify-center text-gray-400 dark:text-gray-500">
            Card 2 (Coming Soon)
          </div>
        </CardComp>
        <CardComp>
          <div class="h-24 flex items-center justify-center text-gray-400 dark:text-gray-500">
            Card 3 (Coming Soon)
          </div>
        </CardComp>
      </div>

      <!-- Dashboard Overview Section -->
      <CardComp>
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Dashboard Overview</h2>
        </div>
        <p class="text-gray-600 dark:text-gray-300">
          Here you can manage employee records, track attendance, approve leave, and handle payroll efficiently.
        </p>
      </CardComp>
    </main>
  </div>
</template>

<script>
import CardComp from '@/components/CardComp.vue';

export default {
  name: 'DashboardView',
  components: { CardComp },
};
</script>
