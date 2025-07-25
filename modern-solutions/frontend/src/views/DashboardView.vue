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
            <p class="mt-2 text-2xl font-semibold text-purple-600 dark:text-purple-400">
              {{ averageAttendance }}%
            </p>
          </div>
        </CardComp>
        <CardComp>
          <div class="p-4">
            <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400">Open Leave Requests</h4>
            <p class="mt-2 text-2xl font-semibold text-yellow-600 dark:text-yellow-400">4</p>
          </div>
        </CardComp>
      </div>

      <!-- Performance Reviews Table -->
      <CardComp>
        <h3 class="text-lg font-semibold mb-3">Performance Reviews</h3>
        <table class="min-w-full text-sm">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200">
              <th class="py-2 px-3 text-left">Employee</th>
              <th class="py-2 px-3 text-left">Reviewer</th>
              <th class="py-2 px-3 text-left">Period</th>
              <th class="py-2 px-3 text-left">Score</th>
              <th class="py-2 px-3 text-left">Comments</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="rev in reviews.slice(0,5)"
              :key="rev.review_id"
              class="border-b border-gray-200 dark:border-gray-700"
            >
              <td class="py-2 px-3">{{ rev.first_name }} {{ rev.last_name }}</td>
              <td class="py-2 px-3">{{ rev.reviewer }}</td>
              <td class="py-2 px-3">{{ rev.review_period }}</td>
              <td class="py-2 px-3 font-semibold" :class="rev.score >= 7 ? 'text-green-500' : 'text-red-500'">
                {{ rev.score }}
              </td>
              <td class="py-2 px-3">{{ rev.comments }}</td>
            </tr>
          </tbody>
        </table>
      </CardComp>

      <!-- Existing Overview and other sections -->
      <CardComp>
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Dashboard Overview</h2>
        </div>
        <p class="text-gray-600 dark:text-gray-300 mb-6 italic font-light tracking-wide">
          Effortlessly manage employee records, monitor attendance in real-time, approve leave requests seamlessly,
          and streamline payroll—all from a single intuitive dashboard.
        </p>

        <!-- Performance Chart -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Performance Chart</h3>
          <div class="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <canvas id="dashboardChart" class="w-full h-64"></canvas>
          </div>
        </div>
      </CardComp>

      <!-- Attendance Table -->
      <CardComp>
        <h3 class="text-lg font-semibold mb-3">Latest Attendance</h3>
        <table class="min-w-full text-sm">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-700">
              <th class="py-2 px-3 text-left">Employee</th>
              <th class="py-2 px-3 text-left">Date</th>
              <th class="py-2 px-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="att in attendanceData.slice(0,5)"
              :key="att.attendance_id"
              class="border-b border-gray-200 dark:border-gray-700"
            >
              <td class="py-2 px-3">{{ att.first_name }} {{ att.last_name }}</td>
              <td class="py-2 px-3">{{ att.attendance_date }}</td>
              <td class="py-2 px-3 font-medium" :class="att.status === 'Present' ? 'text-green-600' : 'text-red-600'">
                {{ att.status }}
              </td>
            </tr>
          </tbody>
        </table>
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
  data() {
    return {
      attendanceData: [],
      reviews: [],
      averageAttendance: 0
    };
  },
  mounted() {
    this.loadPerformanceChart();
    this.fetchAttendance();
    this.fetchReviews();
  },
  methods: {
    async fetchAttendance() {
      try {
        const res = await fetch('http://localhost:5000/attendance');
        const data = await res.json();
        this.attendanceData = data;
        if (data.length > 0) {
          const presentCount = data.filter(a => a.status.toLowerCase() === 'present').length;
          this.averageAttendance = ((presentCount / data.length) * 100).toFixed(0);
        }
      } catch (err) {
        console.error('Error fetching attendance:', err);
      }
    },

    async fetchReviews() {
      try {
        const res = await fetch('http://localhost:5000/reviews');
        const data = await res.json();
        this.reviews = data;
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    },

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
              y: { min: 0, max: 10, ticks: { stepSize: 1 } }
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
