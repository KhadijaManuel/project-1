<template>
  <div class="p-6 space-y-8">
    <!-- Top Stat Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      <!-- Employees -->
      <CardComp v-if="employees.length" class="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 flex items-center justify-between">
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Employees</p>
          <p class="text-3xl font-semibold text-gray-900 dark:text-white">{{ employees.length }}</p>
        </div>
        <span class="text-blue-500 text-2xl">👨‍💼</span>
      </CardComp>

      <!-- Attendance -->
      <CardComp v-if="attendanceData.length" class="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 flex items-center justify-between">
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Attendance Records</p>
          <p class="text-3xl font-semibold text-gray-900 dark:text-white">{{ attendanceData.length }}</p>
        </div>
        <span class="text-green-500 text-2xl">📋</span>
      </CardComp>

      <!-- Performance -->
      <CardComp v-if="performanceReviews.length" class="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 flex items-center justify-between">
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Performance Reviews</p>
          <p class="text-3xl font-semibold text-gray-900 dark:text-white">{{ performanceReviews.length }}</p>
        </div>
        <span class="text-yellow-500 text-2xl">📈</span>
      </CardComp>

      <!-- Leave Requests -->
      <CardComp v-if="leaveRequests.length" class="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 flex items-center justify-between">
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Leave Requests</p>
          <p class="text-3xl font-semibold text-gray-900 dark:text-white">{{ leaveRequests.length }}</p>
        </div>
        <span class="text-red-500 text-2xl">📝</span>
      </CardComp>

      <!-- Total Payroll -->
      <CardComp v-if="employees.length" class="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 flex items-center justify-between">
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Total Payroll (ZAR)</p>
          <p class="text-3xl font-semibold text-gray-900 dark:text-white">R {{ totalPayroll }}</p>
        </div>
        <span class="text-purple-500 text-2xl">💰</span>
      </CardComp>
    </div>

    <!-- Quick Actions -->
    <div class="flex flex-wrap gap-4 my-6">
      <router-link
        to="/employees"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        ➕ Add Employee
      </router-link>
      <router-link
        to="/leave"
        class="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
      >
        🗓️ Request Leave
      </router-link>
    </div>

    <!-- Charts & Attendance Table -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Performance Line Chart -->
      <CardComp class="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
        <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">Performance Chart</h3>
        <canvas ref="chartRef" class="w-full h-64"></canvas>
      </CardComp>

      <!-- Recent Attendance Table -->
      <CardComp class="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md lg:col-span-1 lg:row-span-1">
        <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">Recent Attendance</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full text-sm text-left">
            <thead>
              <tr class="border-b dark:border-gray-700">
                <th class="py-2 px-4 text-gray-600 dark:text-gray-300">Employee</th>
                <th class="py-2 px-4 text-gray-600 dark:text-gray-300">Date</th>
                <th class="py-2 px-4 text-gray-600 dark:text-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(att, index) in attendanceData.slice(0, 5)"
                :key="index"
                class="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <td class="py-2 px-4 text-gray-800 dark:text-gray-100">
                  {{ att.first_name }} {{ att.last_name }}
                </td>
                <td class="py-2 px-4 text-gray-700 dark:text-gray-300">
                  {{ formatDate(att.attendance_date) }}
                </td>
                <td class="py-2 px-4">
                  <span
                    :class="{
                      'text-green-600': att.status === 'Present',
                      'text-red-600': att.status === 'Absent',
                      'text-yellow-600': att.status === 'Leave'
                    }"
                  >
                    {{ att.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardComp>

      <!-- Attendance Doughnut Chart -->
      <CardComp class="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md lg:col-span-1 lg:row-span-1">
        <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">Attendance Overview</h3>
        <canvas ref="attendanceChartRef" class="w-full h-64"></canvas>
      </CardComp>
    </div>

    <!-- Employee Cards -->
    <div>
      <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">Featured Employees</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <CardComp
          v-for="(emp, i) in employees.slice(0, 6)"
          :key="i"
          class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition"
        >
          <h4 class="text-lg font-semibold text-gray-800 dark:text-white">
            {{ emp.first_name }} {{ emp.last_name }}
          </h4>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ emp.role || 'N/A' }}</p>
        </CardComp>
      </div>
    </div>
  </div>
</template>

<script>
import CardComp from '@/components/CardComp.vue';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  components: { CardComp },
  data() {
    return {
      employees: [],
      attendanceData: [],
      performanceReviews: [],
      leaveRequests: [],
      performanceChart: null,
      attendanceChart: null,
    };
  },
  computed: {
    totalPayroll() {
      return this.employees
        .reduce((sum, e) => sum + parseFloat(e.salary || 0), 0)
        .toFixed(2);
    },
  },
  mounted() {
    this.fetchEmployees();
    this.fetchAttendance();
    this.fetchReviewsAndLoadChart();
    this.fetchLeaveRequests();
  },
  methods: {
    // Format dates as DD MMM YYYY
    formatDate(dateStr) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString(undefined, options);
    },

    async fetchEmployees() {
      try {
        const res = await fetch('http://localhost:5000/employees');
        this.employees = await res.json();
      } catch (err) {
        console.error('Error fetching employees:', err);
      }
    },

    async fetchAttendance() {
      try {
        const res = await fetch('http://localhost:5000/attendance');
        const data = await res.json();
        this.attendanceData = data.sort(
          (a, b) => new Date(b.attendance_date) - new Date(a.attendance_date)
        );
        this.loadAttendanceChart(this.attendanceData);
      } catch (err) {
        console.error('Error fetching attendance:', err);
      }
    },

    async fetchReviewsAndLoadChart() {
      try {
        const res = await fetch('http://localhost:5000/reviews');
        const data = await res.json();
        this.performanceReviews = data;
        this.loadPerformanceChart(data);
      } catch (err) {
        console.error('Error fetching performance reviews:', err);
      }
    },

    async fetchLeaveRequests() {
      try {
        const res = await fetch('http://localhost:5000/leaves');
        this.leaveRequests = await res.json();
      } catch (err) {
        console.error('Error fetching leave requests:', err);
      }
    },

    loadPerformanceChart(reviews) {
      const labels = reviews.map((r) => `${r.first_name} ${r.last_name}`);
      const data = reviews.map((r) => r.score);

      if (this.performanceChart) this.performanceChart.destroy();

      const ctx = this.$refs.chartRef.getContext('2d');

      this.performanceChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Performance Score',
              data,
              borderColor: '#3b82f6',
              backgroundColor: 'rgba(59, 130, 246, 0.2)',
              tension: 0.3,
              fill: true,
              pointBackgroundColor: '#3b82f6',
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { labels: { color: '#374151' } },
            title: {
              display: true,
              text: 'Employee Performance',
              color: '#374151',
            },
          },
          scales: {
            x: {
              ticks: { color: '#6b7280', autoSkip: true, maxTicksLimit: 10 },
            },
            y: {
              ticks: { color: '#6b7280' },
            },
          },
        },
      });
    },

    loadAttendanceChart(records) {
      const statusCounts = records.reduce(
        (acc, cur) => {
          acc[cur.status] = (acc[cur.status] || 0) + 1;
          return acc;
        },
        {}
      );

      const labels = Object.keys(statusCounts);
      const counts = Object.values(statusCounts);

      if (this.attendanceChart) this.attendanceChart.destroy();

      const ctx = this.$refs.attendanceChartRef.getContext('2d');

      this.attendanceChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels,
          datasets: [
            {
              data: counts,
              backgroundColor: ['#22c55e', '#ef4444', '#eab308'],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { labels: { color: '#374151' } },
            title: {
              display: true,
              text: 'Attendance Status Distribution',
              color: '#374151',
            },
          },
        },
      });
    },
  },
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
