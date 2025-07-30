<template>
  <div class="flex min-h-screen bg-gray-50 dark:bg-gray-900">
    <main class="flex-1 p-6 sm:p-10 max-w-7xl mx-auto">
      <CardComp class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
        <div class="mb-6">
          <h2 class="text-3xl font-extrabold text-blue-700 dark:text-blue-400 tracking-tight">
            Employee Attendance
          </h2>
        </div>

        <!-- Export Button -->
        <div class="mb-6 flex justify-end">
          <button
            @click="exportToCSV"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm shadow"
          >
            Export to CSV
          </button>
        </div>

        <!-- Employee Cards -->
        <div v-if="attendanceData.length" class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <div
            v-for="employee in attendanceData"
            :key="employee.employeeId"
            class="bg-gradient-to-br from-blue-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-xl shadow border border-blue-200 dark:border-gray-600 p-5 transition hover:shadow-lg"
          >
            <h3 class="text-lg font-semibold text-blue-800 dark:text-white mb-1">
              {{ employee.name }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">ID: {{ employee.employeeId }}</p>

            <!-- Attendance Section -->
            <div class="mb-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">Attendance</h4>
              <ul class="space-y-1 max-h-28 overflow-y-auto pr-2">
                <li
                  v-for="record in employee.attendance"
                  :key="record.date"
                  class="text-sm flex items-center justify-between"
                >
                  <span class="text-gray-700 dark:text-gray-300 font-medium">{{ record.date }}</span>
                  <span
                    class="ml-2 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
                    :class="{
                      'bg-green-100 text-green-800': record.status === 'Present',
                      'bg-red-100 text-red-800': record.status === 'Absent',
                      'bg-yellow-100 text-yellow-800': record.status === 'Late',
                    }"
                  >
                    <span v-if="record.status === 'Present'">✅</span>
                    <span v-else-if="record.status === 'Absent'">❌</span>
                    <span v-else-if="record.status === 'Late'">⏱️</span>
                    {{ record.status }}
                  </span>
                </li>
              </ul>
            </div>

            <!-- Leave Section -->
            <div>
              <h4 class="text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">Leave Requests</h4>
              <ul class="space-y-1 max-h-28 overflow-y-auto pr-2">
                <li
                  v-for="request in employee.leaveRequests"
                  :key="request.date"
                  class="text-sm flex items-start justify-between"
                >
                  <div class="text-gray-700 dark:text-gray-300">
                    <span class="font-medium">{{ request.date }}:</span> {{ request.reason }}
                  </div>
                  <span
                    class="ml-2 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
                    :class="{
                      'bg-blue-100 text-blue-800': request.status === 'Approved',
                      'bg-yellow-100 text-yellow-800': request.status === 'Pending',
                      'bg-gray-100 text-gray-800': request.status === 'Rejected'
                    }"
                  >
                    <span v-if="request.status === 'Approved'">✔️</span>
                    <span v-else-if="request.status === 'Pending'">🟡</span>
                    <span v-else-if="request.status === 'Rejected'">🚫</span>
                    {{ request.status }}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p v-else class="p-6 text-center text-gray-500 dark:text-gray-400">
          No attendance data available.
        </p>
      </CardComp>
    </main>
  </div>
</template>

<script>
import CardComp from '@/components/CardComp.vue';

export default {
  name: 'EmployeeAttendance',
  components: { CardComp },
  data() {
    return {
      attendanceData: [],
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
      } catch (err) {
        console.error('Failed to load data:', err);
      }
    },

    exportToCSV() {
      const rows = [
        ['Employee ID', 'Name', 'Date', 'Attendance Status', 'Leave Reason', 'Leave Status'],
      ];

      this.attendanceData.forEach(emp => {
        emp.attendance.forEach(att => {
          const leave = emp.leaveRequests.find(lr => lr.date === att.date);
          rows.push([
            emp.employeeId,
            emp.name,
            att.date,
            att.status,
            leave ? leave.reason : '',
            leave ? leave.status : '',
          ]);
        });
      });

      const csvContent = rows.map(r => r.map(val => `"${val}"`).join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'employee_attendance.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
/* Optional custom scrollbar */
ul::-webkit-scrollbar {
  width: 6px;
}
ul::-webkit-scrollbar-thumb {
  background-color: rgba(100, 116, 139, 0.5);
  border-radius: 4px;
}
</style>
