<template>
  <div class="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
    <main class="flex-1 p-8 overflow-y-auto space-y-6">

      <!-- Summary Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <CardComp>
          <div class="p-4">
            <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Monthly Payroll</h4>
            <p class="mt-2 text-2xl font-semibold text-green-600 dark:text-green-400">R573 000</p>
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
            <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400">Avg Attendance</h4>
            <p class="mt-2 text-2xl font-semibold text-purple-600 dark:text-purple-400">90%</p>
          </div>
        </CardComp>
        <CardComp>
          <div class="p-4">
            <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400">Open Leave Requests</h4>
            <p class="mt-2 text-2xl font-semibold text-yellow-600 dark:text-yellow-400">4</p>
          </div>
        </CardComp>
      </div>

      <!-- Dashboard Overview -->
      <CardComp>
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Dashboard Overview</h2>
        </div>
        <p class="text-gray-600 dark:text-gray-300 mb-6 italic font-light tracking-wide">
          Effortlessly manage employee records, monitor attendance in real-time, approve leave requests seamlessly,
          and streamline payroll—all from a single intuitive dashboard.
        </p>

        <!-- Main Performance Chart -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Performance Chart</h3>
          <div class="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <canvas id="dashboardChart" class="w-full h-64"></canvas>
          </div>
        </div>

        <!-- Task Reminders -->
        <div>
          <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Task Reminders</h3>
          <ul class="space-y-3">
            <li class="flex justify-between bg-white dark:bg-gray-800 px-5 py-3 rounded-lg shadow hover:shadow-md">
              <span class="font-medium">Review Payroll Summary</span>
              <span class="text-xs text-gray-500 dark:text-gray-400">Due: Today</span>
            </li>
            <li class="flex justify-between bg-white dark:bg-gray-800 px-5 py-3 rounded-lg shadow hover:shadow-md">
              <span class="font-medium">Approve Leave Requests</span>
              <span class="text-xs text-gray-500 dark:text-gray-400">Due: Tomorrow</span>
            </li>
            <li class="flex justify-between bg-white dark:bg-gray-800 px-5 py-3 rounded-lg shadow hover:shadow-md">
              <span class="font-medium">Update Employee Records</span>
              <span class="text-xs text-gray-500 dark:text-gray-400">Due: Friday</span>
            </li>
          </ul>
        </div>
      </CardComp>

      <!-- Employees by Department -->
      <CardComp>
        <h3 class="text-lg font-semibold mb-3">Employees by Department</h3>
        <div class="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <canvas id="departmentChart" class="w-full h-64"></canvas>
        </div>
      </CardComp>

      <!-- Recent Hires -->
      <CardComp>
        <h3 class="text-lg font-semibold mb-3">Recent Hires</h3>
        <ul class="divide-y divide-gray-200 dark:divide-gray-700">
          <li class="flex items-center justify-between py-3">
            <div>
              <p class="font-medium">Zanele Khumalo</p>
              <p class="text-xs text-gray-500">Marketing Specialist</p>
            </div>
            <span class="text-xs text-green-600 dark:text-green-400">Hired 2 days ago</span>
          </li>
          <li class="flex items-center justify-between py-3">
            <div>
              <p class="font-medium">Thabo Molefe</p>
              <p class="text-xs text-gray-500">Quality Analyst</p>
            </div>
            <span class="text-xs text-green-600 dark:text-green-400">Hired last week</span>
          </li>
        </ul>
      </CardComp>

      <!-- Leave Requests -->
      <CardComp>
        <h3 class="text-lg font-semibold mb-3">Pending Leave Requests</h3>
        <table class="min-w-full text-sm">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200">
              <th class="py-2 px-3 text-left">Employee</th>
              <th class="py-2 px-3 text-left">Dates</th>
              <th class="py-2 px-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <td class="py-2 px-3">Sipho Zulu</td>
              <td class="py-2 px-3">22–25 July</td>
              <td class="py-2 px-3 text-yellow-500 font-medium">Pending</td>
            </tr>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <td class="py-2 px-3">Karabo Dlamini</td>
              <td class="py-2 px-3">1–3 Aug</td>
              <td class="py-2 px-3 text-yellow-500 font-medium">Pending</td>
            </tr>
          </tbody>
        </table>
      </CardComp>

      <!-- Announcements -->
      <CardComp>
        <h3 class="text-lg font-semibold mb-3">HR Announcements</h3>
        <ul class="space-y-2 text-sm">
          <li class="bg-blue-50 dark:bg-blue-900 p-3 rounded shadow">
            🎉 <strong>Team Building Event</strong> – Friday 3 PM at the rooftop!
          </li>
          <li class="bg-green-50 dark:bg-green-900 p-3 rounded shadow">
            ✅ <strong>Mid-Year Reviews</strong> completed successfully.
          </li>
        </ul>
      </CardComp>

    </main>
  </div>
</template>

<script>
import CardComp from '@/components/CardComp.vue';
import {
  Chart,
  LineController,
  LineElement,
  BarController,
  BarElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
} from 'chart.js';

Chart.register(
  LineController,
  LineElement,
  BarController,
  BarElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
);

export default {
  name: 'DashboardView',
  components: { CardComp },
  mounted() {
    this.loadPerformanceChart();
    this.loadDepartmentChart();
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
            datasets: [{
              label: 'Performance Score',
              data: scores,
              borderColor: 'rgba(59, 130, 246, 0.8)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              fill: true,
              tension: 0.4,
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              title: { display: true, text: 'Q4 Performance Scores' }
            },
            scales: {
              y: {
                min: 0,
                max: 10,
                ticks: { stepSize: 1 }
              }
            }
          }
        });
      } catch (err) {
        console.error('Error loading performance data:', err);
      }
    },
    loadDepartmentChart() {
      const ctx = document.getElementById('departmentChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Development', 'HR', 'Marketing', 'Sales', 'Finance'],
          datasets: [{
            label: 'Employees',
            data: [4, 2, 3, 3, 1],
            backgroundColor: 'rgba(59, 130, 246, 0.6)',
            borderRadius: 8
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: true, text: 'Employees by Department' }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { stepSize: 1 }
            }
          }
        }
      });
    }
  }
};
</script>
