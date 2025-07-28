<template>
  <div class="p-8 space-y-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <!-- Summary Cards Row -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <CardComp class="flex items-center space-x-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <div class="p-3 bg-blue-100 dark:bg-blue-700 rounded-full">
          <span class="text-blue-600 dark:text-white text-3xl">👨‍💼</span>
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-300">Employees</p>
          <p class="text-2xl font-extrabold text-gray-900 dark:text-white">{{ employees.length }}</p>
        </div>
      </CardComp>

      <CardComp class="flex items-center space-x-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <div class="p-3 bg-green-100 dark:bg-green-700 rounded-full">
          <span class="text-green-600 dark:text-white text-3xl">📋</span>
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-300">Attendance Records</p>
          <p class="text-2xl font-extrabold text-gray-900 dark:text-white">{{ attendanceData.length }}</p>
        </div>
      </CardComp>

      <CardComp class="flex items-center space-x-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <div class="p-3 bg-yellow-100 dark:bg-yellow-700 rounded-full">
          <span class="text-yellow-600 dark:text-white text-3xl">📈</span>
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-300">Performance Reviews</p>
          <p class="text-2xl font-extrabold text-gray-900 dark:text-white">{{ performanceReviews.length }}</p>
        </div>
      </CardComp>

      <CardComp class="flex items-center space-x-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <div class="p-3 bg-purple-100 dark:bg-purple-700 rounded-full">
          <span class="text-purple-600 dark:text-white text-3xl">💰</span>
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-300">Total Monthly Payroll</p>
          <p class="text-2xl font-extrabold text-gray-900 dark:text-white">R{{ totalPayroll.toLocaleString() }}</p>
        </div>
      </CardComp>
    </div>

    <!-- Middle Section: Attendance Progress & Radar Chart -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <CardComp class="flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <p class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Average Attendance</p>
        <svg class="w-40 h-40" viewBox="0 0 36 36">
          <path
            class="text-gray-200 dark:text-gray-700"
            stroke-width="3"
            fill="none"
            stroke="currentColor"
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            class="text-indigo-500"
            stroke-width="3"
            fill="none"
            stroke-linecap="round"
            :stroke-dasharray="attendanceDashArray"
            stroke="currentColor"
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text
            x="18"
            y="20.35"
            class="text-3xl font-bold fill-current text-indigo-600 dark:text-indigo-400"
            text-anchor="middle"
          >{{ averageAttendance }}%</text>
        </svg>
      </CardComp>

      <!-- Performance Radar Chart -->
      <CardComp class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md col-span-2">
        <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-6">Performance Overview</h3>
        <canvas ref="radarChart" class="w-full h-64"></canvas>
      </CardComp>
    </div>

    <!-- Recent Leave Requests -->
    <CardComp class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">Recent Leave Requests</h3>
      <ul>
        <li
          v-for="leave in leaveRequests.slice(0, 6)"
          :key="leave.id"
          class="flex justify-between py-2 border-b dark:border-gray-700"
        >
          <span>{{ leave.first_name }} {{ leave.last_name }}</span>
          <span
            :class="{
              'px-3 py-1 rounded-full text-xs font-semibold': true,
              'bg-yellow-300 text-yellow-900': leave.status === 'Pending',
              'bg-green-300 text-green-900': leave.status === 'Approved',
              'bg-red-300 text-red-900': leave.status === 'Rejected',
            }"
          >
            {{ leave.status }}
          </span>
        </li>
      </ul>
    </CardComp>

    <!-- Featured Employees with Avatars -->
    <div>
      <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-6">Featured Employees</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <CardComp
          v-for="(emp, i) in employees.slice(0, 6)"
          :key="i"
          class="flex items-center space-x-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg"
        >
          <div
            class="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-600 text-white font-semibold text-lg uppercase"
          >
            {{ emp.first_name.charAt(0) }}{{ emp.last_name.charAt(0) }}
          </div>
          <div>
            <h4 class="text-lg font-semibold text-gray-800 dark:text-white">
              {{ emp.first_name }} {{ emp.last_name }}
            </h4>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ emp.role || 'N/A' }}</p>
          </div>
        </CardComp>
      </div>
    </div>
  </div>
</template>

<script>
import CardComp from '@/components/CardComp.vue';
import { Chart, RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default {
  components: { CardComp },
  data() {
    return {
      employees: [],
      attendanceData: [],
      performanceReviews: [],
      leaveRequests: [],
      totalPayroll: 0,
      averageAttendance: 0,
      attendanceDashArray: '0, 100',
      radarChart: null,
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      await Promise.all([
        this.fetchEmployees(),
        this.fetchAttendance(),
        this.fetchReviews(),
        this.fetchLeaveRequests(),
      ]);
      this.updateAttendanceProgress();
      this.initRadarChart();
    },
    async fetchEmployees() {
      try {
        const res = await fetch('http://localhost:5000/employees');
        this.employees = await res.json();
        this.totalPayroll = this.employees.reduce((sum, e) => sum + (e.salary || 0), 0);
      } catch (e) {
        console.error(e);
      }
    },
    async fetchAttendance() {
      try {
        const res = await fetch('http://localhost:5000/attendance');
        const data = await res.json();
        this.attendanceData = data;
        const presentCount = data.filter(a => a.status.toLowerCase() === 'present').length;
        this.averageAttendance = data.length ? Math.round((presentCount / data.length) * 100) : 0;
      } catch (e) {
        console.error(e);
      }
    },
    async fetchReviews() {
      try {
        const res = await fetch('http://localhost:5000/reviews');
        this.performanceReviews = await res.json();
      } catch (e) {
        console.error(e);
      }
    },
    async fetchLeaveRequests() {
      try {
        const res = await fetch('http://localhost:5000/leaves');
        this.leaveRequests = await res.json();
      } catch (e) {
        console.error(e);
      }
    },
    updateAttendanceProgress() {
   
      this.attendanceDashArray = `${this.averageAttendance}, 100`;
    },
    initRadarChart() {
      if (this.radarChart) this.radarChart.destroy();
      const ctx = this.$refs.radarChart.getContext('2d');

      

      
      const labels = ['Quality', 'Speed', 'Teamwork', 'Creativity', 'Reliability'];


      const datasetData = this.performanceReviews.length
        ? this.performanceReviews.map(() => labels.map(() => Math.floor(Math.random() * 50 + 50))) // random between 50-100
        : [];

      this.radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
          labels,
          datasets: this.performanceReviews.map((r, i) => ({
            label: `${r.first_name} ${r.last_name}`,
            data: datasetData[i] || [],
            fill: true,
            backgroundColor: `rgba(59, 130, 246, 0.2)`,
            borderColor: `rgba(59, 130, 246, 1)`,
            pointBackgroundColor: `rgba(59, 130, 246, 1)`,
            tension: 0.4,
          })),
        },
        options: {
          responsive: true,
          plugins: {
            legend: { labels: { color: '#374151' } },
            title: { display: true, text: 'Employee Performance Radar', color: '#374151' },
          },
          scales: {
            r: {
              angleLines: { color: '#d1d5db' },
              grid: { color: '#e5e7eb' },
              pointLabels: { color: '#6b7280', font: { size: 12 } },
              min: 0,
              max: 100,
              ticks: { color: '#6b7280', stepSize: 20 },
            },
          },
        },
      });
    },
  },
};
</script>

<style scoped>
/* nothing custom for now */
</style>
