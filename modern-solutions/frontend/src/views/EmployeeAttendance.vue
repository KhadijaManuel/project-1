<template>
  <div class="flex min-h-screen bg-gray-100 dark:bg-gray-900">
    <main class="flex-1 p-8 overflow-y-auto max-w-6xl mx-auto">
      <CardComp>
        <div class="mb-8">
          <h2 class="text-3xl font-extrabold text-blue-700 dark:text-blue-400 tracking-tight">
            Employee Attendance
          </h2>
        </div>

        <!-- Date Selector -->
        <div class="mb-8 flex items-center space-x-6 flex-wrap">
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
            class="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-gray-100 rounded-lg shadow-sm transition-colors duration-300"
          >
            <thead class="bg-gray-100 dark:bg-gray-700 text-left">
              <tr>
                <th class="px-4 py-3 border-b">Employee ID</th>
                <th class="px-4 py-3 border-b">Name</th>
                <th class="px-4 py-3 border-b">Attendance</th>
                <th class="px-4 py-3 border-b">Leave Requests</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="employee in attendanceData"
                :key="employee.employeeId"
                class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td class="px-4 py-3 border-t">{{ employee.employeeId }}</td>
                <td class="px-4 py-3 border-t">{{ employee.name }}</td>
                <td class="px-4 py-3 border-t">
                  <ul>
                    <li v-for="record in employee.attendance" :key="record.date" class="mb-1">
                      <span class="font-medium">{{ record.date }}:</span> {{ record.status }}
                    </li>
                  </ul>
                </td>
                <td class="px-4 py-3 border-t">
                  <ul>
                    <li v-for="request in employee.leaveRequests" :key="request.date" class="mb-1">
                      <span class="font-medium">{{ request.date }}:</span> {{ request.reason }} ({{ request.status }})
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
          <p v-else class="p-6 text-center text-gray-500 dark:text-gray-400">
            No attendance data available.
          </p>
        </CardComp>

        <!-- Responsive Bar Chart -->
        <CardComp class="p-4">
          <h2 class="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
            Attendance Summary – {{ selectedDate }}
          </h2>
          <div class="w-full overflow-x-auto">
            <canvas id="attendanceChart" class="w-full h-80"></canvas>
          </div>
        </CardComp>
      </CardComp>
    </main>
  </div>
</template>

<script>
import CardComp from '@/components/CardComp.vue';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default {
  name: 'EmployeeAttendance',
  components: { CardComp },
  data() {
    return {
      attendanceData: [],
      selectedDate: new Date().toISOString().split('T')[0],
      chartInstance: null,
    };
  },
  methods: {
    async fetchData() {
      try {
        const [attendanceRes, leaveRes] = await Promise.all([
          fetch('http://localhost:5000/attendance'),
          fetch('http://localhost:5000/leaves'),
        ]);
        const attendanceRecords = await attendanceRes.json();
        const leaveRecords = await leaveRes.json();

        const grouped = {};
        // Group attendance
        attendanceRecords.forEach((rec) => {
          const empId = rec.employee_id;
          if (!grouped[empId]) {
            grouped[empId] = {
              employeeId: empId,
              name: `${rec.first_name} ${rec.last_name}`,
              attendance: [],
              leaveRequests: [],
            };
          }
          grouped[empId].attendance.push({ date: rec.attendance_date, status: rec.status });
        });
        // Group leaves
        leaveRecords.forEach((leave) => {
          const empId = leave.employee_id;
          if (!grouped[empId]) {
            grouped[empId] = {
              employeeId: empId,
              name: `${leave.first_name} ${leave.last_name}`,
              attendance: [],
              leaveRequests: [],
            };
          }
          grouped[empId].leaveRequests.push({
            date: leave.leave_date,
            reason: leave.reason,
            status: leave.status,
          });
        });

        this.attendanceData = Object.values(grouped);
        this.$nextTick(() => this.renderChart());
      } catch (err) {
        console.error('Failed to load data:', err);
      }
    },

    countStatus(status) {
      return this.attendanceData.reduce((count, emp) => {
        const rec = emp.attendance.find((r) => r.date === this.selectedDate);
        return rec && rec.status === status ? count + 1 : count;
      }, 0);
    },

    renderChart() {
      if (this.chartInstance) this.chartInstance.destroy();

      const presentCount = this.countStatus('Present');
      const absentCount = this.countStatus('Absent');
      const naCount = this.attendanceData.length - presentCount - absentCount;

      const ctx = document.getElementById('attendanceChart')?.getContext('2d');
      if (!ctx) return;

      this.chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Present', 'Absent', 'No Data'],
          datasets: [
            {
              label: 'Number of Employees',
              data: [presentCount, absentCount, naCount],
              backgroundColor: [
                'rgba(34,197,94,0.8)', // green
                'rgba(220,38,38,0.8)', // red
                'rgba(156,163,175,0.8)', // gray
              ],
              borderRadius: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => `${ctx.dataset.label}: ${ctx.formattedValue}`,
              },
            },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: '#374151', font: { weight: '600' } },
            },
            y: {
              beginAtZero: true,
              ticks: { color: '#374151', precision: 0 },
              grid: { color: 'rgba(0,0,0,0.1)' },
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
    this.fetchData();
  },
};
</script>

<style scoped>
/* Add optional custom styling if desired */
</style>
