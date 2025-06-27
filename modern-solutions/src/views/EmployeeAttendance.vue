<template>
  <div :class="{ 'dark': isDarkMode }" class="max-w-4xl mx-auto p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg transition-colors duration-300">
    <h3 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Employee Attendance</h3>

    <!-- Dark Mode Toggle -->
    <div class="flex items-center mb-4">
      <label class="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" v-model="isDarkMode" @change="toggleDarkMode" class="sr-only" />
        <div class="w-11 h-6 bg-gray-200 dark:bg-gray-600 rounded-full shadow-inner"></div>
        <div
          class="absolute w-5 h-5 bg-white dark:bg-gray-300 rounded-full shadow transition-transform duration-200 ease-in-out"
          :class="{ 'transform translate-x-5': isDarkMode }"
        ></div>
      </label>
      <span class="ml-3 text-gray-700 dark:text-gray-300">{{ isDarkMode ? 'Dark Mode' : 'Light Mode' }}</span>
    </div>

    <table v-if="attendanceData.length" class="min-w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-sm text-gray-900 dark:text-gray-100">
      <thead class="bg-gray-100 dark:bg-gray-600">
        <tr>
          <th class="border px-4 py-2">Employee ID</th>
          <th class="border px-4 py-2">Name</th>
          <th class="border px-4 py-2">Attendance</th>
          <th class="border px-4 py-2">Leave Requests</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in attendanceData" :key="employee.employeeId" class="hover:bg-gray-50 dark:hover:bg-gray-600">
          <td class="border px-4 py-2">{{ employee.employeeId }}</td>
          <td class="border px-4 py-2">{{ employee.name }}</td>
          <td class="border px-4 py-2">
            <ul>
              <li v-for="record in employee.attendance" :key="record.date">
                {{ record.date }}: {{ record.status }}
              </li>
            </ul>
          </td>
          <td class="border px-4 py-2">
            <ul>
              <li v-for="request in employee.leaveRequests" :key="request.date">
                {{ request.date }}: {{ request.reason }} ({{ request.status }})
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else class="text-gray-600 dark:text-gray-300">Loading attendance data...</div>
  </div>
</template>

<script>
export default {
  name: 'EmployeeAttendance',
  data() {
    return {
      isDarkMode: localStorage.getItem('darkMode') === 'true',
      attendanceData: []
    };
  },
  methods: {
    toggleDarkMode() {
      localStorage.setItem('darkMode', this.isDarkMode);
      document.documentElement.classList.toggle('dark', this.isDarkMode);
    },
    async fetchAttendanceData() {
      try {
        const response = await fetch('/data/attendance.json');
        const data = await response.json();
        this.attendanceData = data.attendanceAndLeave || [];
      } catch (error) {
        console.error('Failed to load attendance data:', error);
      }
    }
  },
  mounted() {
    document.documentElement.classList.toggle('dark', this.isDarkMode);
    this.fetchAttendanceData();
  }
};
</script>
