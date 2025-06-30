<template>
  <div class="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
    <!-- Main content -->
    <main class="flex-1 p-8 overflow-y-auto space-y-6">

      <!-- Dashboard Summary Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <CardComp>
          <div class="p-4">
            <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Monthly Payroll</h4>
            <p class="mt-2 text-2xl font-semibold text-green-600 dark:text-green-400">R573 000</p>
          </div>
        </CardComp>
        <CardComp>
          <div class="p-4">
            <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Employees</h4>
            <p class="mt-2 text-2xl font-semibold text-blue-600 dark:text-blue-400">10</p>
          </div>
        </CardComp>
        <CardComp>
          <div class="p-4">
            <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400">Average Attendance Rate</h4>
            <p class="mt-2 text-2xl font-semibold text-purple-600 dark:text-purple-400">91%</p>
          </div>
        </CardComp>
      </div>

      <!-- Dashboard Overview Section -->
      <CardComp>
        <!-- Header -->
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Dashboard Overview</h2>
        </div>

        <!-- Overview Text -->
        <p class="text-gray-600 dark:text-gray-300 mb-6 italic font-light tracking-wide">
  Effortlessly manage employee records, monitor attendance in real-time, approve leave requests seamlessly, and streamline payroll—all from a single intuitive dashboard.
</p>


        <!-- Chart Section -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Performance Chart</h3>
          <div class="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <canvas id="dashboardChart" class="w-full h-64"></canvas>
          </div>
        </div>

        <!-- Task Reminders Section -->
        <div>
          <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Task Reminders</h3>
          <ul class="space-y-3">
            <li class="flex items-center justify-between bg-white dark:bg-gray-800 px-5 py-3 rounded-lg shadow hover:shadow-md transition-all">
              <span class="font-medium">Review Payroll Summary</span>
              <span class="text-xs text-gray-500 dark:text-gray-400 text-b">Due: Today</span>
            </li>
            <li class="flex items-center justify-between bg-white dark:bg-gray-800 px-5 py-3 rounded-lg shadow hover:shadow-md transition-all">
              <span class="font-medium">Approve Leave Requests</span>
              <span class="text-xs text-gray-500 dark:text-gray-400">Due: Tomorrow</span>
            </li>
            <li class="flex items-center justify-between bg-white dark:bg-gray-800 px-5 py-3 rounded-lg shadow hover:shadow-md transition-all">
              <span class="font-medium">Update Employee Records</span>
              <span class="text-xs text-gray-500 dark:text-gray-400">Due: Friday</span>
            </li>
          </ul>
        </div>
      </CardComp>

    </main>
  </div>
</template>

<script>
import CardComp from '@/components/CardComp.vue';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

export default {
  name: 'DashboardView',
  components: { CardComp },
  mounted() {
    this.loadPerformanceChart();
  },
  methods: {
    async loadPerformanceChart() {
      try {
        const res = await fetch('/data/performance.json');
        const json = await res.json();
        const reviews = json.performanceReviews;

        const labels = reviews.map(r => r.employeeName);
        const scores = reviews.map(r => r.score);

        const ctx = document.getElementById('dashboardChart').getContext('2d');

        new Chart(ctx, {
          type: 'line',
          data: {
            labels,
            datasets: [
              {
                label: 'Performance Score',
                data: scores,
                borderColor: 'rgba(59, 130, 246, 0.8)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.4,
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              title: {
                display: true,
                text: 'Q4 Performance Scores'
              }
            },
            scales: {
              y: {
                min: 0,
                max: 10,
                ticks: {
                  stepSize: 1
                }
              }
            }
          }
        });
      } catch (err) {
        console.error('Error loading performance data:', err);
      }
    }
  }
};
</script>
