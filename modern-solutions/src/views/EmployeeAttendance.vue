<template>
  <div class="flex min-h-screen bg-gray-100 dark:bg-gray-900">

    <!-- Main content -->
    <main class="flex-1 p-8 overflow-y-auto max-w-6xl mx-auto">
      <CardComp>
        <div class="mb-8">
          <h2 class="text-3xl font-extrabold text-blue-700 dark:text-blue-400 tracking-tight">
            Employee Attendance
          </h2>
        </div>

        <!-- Date Selector -->
        <div class="mb-8 flex items-center space-x-6">
          <label for="selectedDate" class="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Select Date:
          </label>
          <input
            id="selectedDate"
            type="date"
            v-model="selectedDate"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>

        <!-- Attendance Table -->
        <CardComp class="overflow-x-auto mb-10">
          <table
            v-if="attendanceData.length"
            class="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-gray-100 rounded-lg shadow-sm transition-colors duration-300"
          >
            <thead class="bg-gray-100 dark:bg-gray-700 text-left">
              <tr>
                <th class="px-4 py-3 border-b border-gray-300 dark:border-gray-600 font-semibold">Employee ID</th>
                <th class="px-4 py-3 border-b border-gray-300 dark:border-gray-600 font-semibold">Name</th>
                <th class="px-4 py-3 border-b border-gray-300 dark:border-gray-600 font-semibold">Attendance</th>
                <th class="px-4 py-3 border-b border-gray-300 dark:border-gray-600 font-semibold">Leave Requests</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="employee in attendanceData"
                :key="employee.employeeId"
                class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td class="px-4 py-3 border-t border-gray-200 dark:border-gray-600">{{ employee.employeeId }}</td>
                <td class="px-4 py-3 border-t border-gray-200 dark:border-gray-600">{{ employee.name }}</td>
                <td class="px-4 py-3 border-t border-gray-200 dark:border-gray-600">
                  <ul>
                    <li
                      v-for="record in employee.attendance"
                      :key="record.date"
                      class="mb-1"
                    >
                      <span class="font-medium">{{ record.date }}:</span> {{ record.status }}
                    </li>
                  </ul>
                </td>
                <td class="px-4 py-3 border-t border-gray-200 dark:border-gray-600">
                  <ul>
                    <li
                      v-for="request in employee.leaveRequests"
                      :key="request.date"
                      class="mb-1"
                    >
                      <span class="font-medium">{{ request.date }}:</span> {{ request.reason }} ({{ request.status }})
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
          <p v-else class="p-6 text-center text-gray-500 dark:text-gray-400">No attendance data available.</p>
        </CardComp>

        <!-- Chart below the table -->
        <CardComp>
          <h2 class="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
            Attendance Summary - {{ selectedDate }}
          </h2>
          <canvas id="performanceChart" class="w-full h-64 max-w-md mx-auto"></canvas>
        </CardComp>
      </CardComp>
    </main>
  </div>
</template>

<script>
import CardComp from '@/components/CardComp.vue';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

export default {
  name: 'EmployeeAttendance',
  components: { CardComp },
  data() {
    return {
      attendanceData: [],
      selectedDate: '2025-07-29',
      chartInstance: null,
    };
  },
  methods: {
    async fetchAttendanceData() {
      try {
        const response = await fetch('/data/attendance.json');
        const data = await response.json();
        this.attendanceData = data.attendanceAndLeave || [];
        this.$nextTick(() => this.renderChart());
      } catch (error) {
        console.error('Failed to load attendance data:', error);
      }
    },
    countStatus(status) {
      return this.attendanceData.reduce((count, emp) => {
        const rec = emp.attendance.find(r => r.date === this.selectedDate);
        return rec && rec.status === status ? count + 1 : count;
      }, 0);
    },
    renderChart() {
      if (this.chartInstance) this.chartInstance.destroy();

      const presentCount = this.countStatus('Present');
      const absentCount = this.countStatus('Absent');
      const naCount = this.attendanceData.length - presentCount - absentCount;

      const ctx = document.getElementById('performanceChart').getContext('2d');

      this.chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Present', 'Absent', 'No Data'],
          datasets: [{
            data: [presentCount, absentCount, naCount],
            backgroundColor: [
              'rgba(34,197,94,0.8)',   // Green
              'rgba(220,38,38,0.8)',   // Red
              'rgba(156,163,175,0.8)', // Gray
            ],
            borderWidth: 2,
            borderColor: 'white',
          }],
        },
        options: {
          responsive: true,
          cutout: '65%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                font: { size: 14, weight: '600' },
                color: '#374151',
              },
            },
            tooltip: {
              callbacks: {
                label: ctx => `${ctx.label}: ${ctx.parsed} employee${ctx.parsed !== 1 ? 's' : ''}`,
              },
            },
          },
        },
      });
    },
  },
  watch: {
    selectedDate() {
      this.$nextTick(() => this.renderChart());
    },
  },
  mounted() {
    this.fetchAttendanceData();
  },
};
</script>

<style scoped>
/* Optional: CardComp styles assumed, else add padding/margin here */
</style>
