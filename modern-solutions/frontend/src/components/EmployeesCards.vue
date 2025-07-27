<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-6 max-w-7xl mx-auto">
    <div v-if="loading" class="col-span-full text-center text-lg text-gray-600">
      Loading employee data...
    </div>

    <div v-if="error" class="col-span-full text-center text-lg text-red-600">
      Error: {{ error }}
    </div>

    <div
      v-for="employee in employees"
      :key="employee.id"
      class="relative w-64 h-96 mx-auto [perspective:1000px] group"
    >
      <div
        class="relative w-full h-full text-center transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
      >
        <div
          class="absolute w-full h-full rounded-xl shadow-lg bg-blue-700 text-white flex flex-col items-center justify-center px-6 [backface-visibility:hidden]"
        >
          <img
            :src="employee.photo"
            alt="Profile Picture"
            class="w-24 h-24 rounded-full object-cover border-4 border-white mb-4 shadow-md"
          />
          <h1 class="text-xl font-bold mb-2">{{ employee.name }}</h1>
          <p class="text-sm">{{ employee.position }}</p>
          <p class="text-sm">{{ employee.department }} Department</p>
        </div>

        <div
          class="absolute w-full h-full rounded-xl shadow-lg bg-white text-gray-800 p-4 overflow-y-auto [backface-visibility:hidden] [transform:rotateY(180deg)]"
        >
          <div>
            <h3 class="text-lg font-semibold text-blue-700 text-center mb-3">Performance Review</h3>

            <div class="h-20 mb-2">
              <canvas :id="`attendance${employee.id}`" class="w-full h-full"></canvas>
            </div>
            <div class="h-20 mb-2">
              <canvas :id="`payroll${employee.id}`" class="w-full h-full"></canvas>
            </div>

            <div class="text-xs space-y-1 mt-2">
              <p>
                <span class="font-semibold">Attendance:</span> {{ employee.attendanceRate }}% |
                <span class="font-semibold">Salary:</span> R{{ employee.finalSalary.toLocaleString() }}
              </p>
              <p><span class="font-semibold">Score:</span> {{ employee.review.score }}/10</p>
              <p><span class="font-semibold">Reviewer:</span> {{ employee.review.reviewer }}</p>
              <p class="italic text-gray-600">
                <span class="font-semibold">Comments:</span> {{ employee.review.comments }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
  name: 'EmployeesCards',
  data() {
    return {
      employees: [], // Initialize as an empty array
      loading: true,  // New state for loading indicator
      error: null     // New state for error messages
    }
  },
  async mounted() {
    await this.fetchEmployees(); // Fetch data first
    if (!this.error) { // Only create charts if no error occurred
      this.createCharts();
    }
  },
  methods: {
    async fetchEmployees() {
      this.loading = true; // Set loading to true before fetching
      this.error = null;   // Clear previous errors

      try {
        // IMPORTANT: Replace this with your actual API endpoint!
        // For local development with a static JSON file, you might use: '/employees.json'
        // If you have a backend, it would be something like: 'https://api.yourdomain.com/employees'
        const response = await fetch('YOUR_ACTUAL_API_ENDPOINT_HERE');

        if (!response.ok) {
          // Handle HTTP errors (e.g., 404 Not Found, 500 Server Error)
          const errorMessage = `HTTP error! Status: ${response.status} - ${response.statusText}`;
          throw new Error(errorMessage);
        }

        const data = await response.json();

        // Validate data structure if necessary
        if (!Array.isArray(data) || data.some(item => !item.id || !item.name || !item.photo)) {
          throw new Error('Fetched data is not in the expected format.');
        }

        this.employees = data;
      } catch (err) {
        console.error("Failed to fetch employees:", err);
        this.error = `Failed to load employee data. Please try again. (${err.message})`;
        this.employees = []; // Clear employees array on error
      } finally {
        this.loading = false; // Set loading to false after fetch attempt (success or failure)
      }
    },
    createCharts() {
      // Ensure employees array is not empty before creating charts
      if (this.employees.length === 0) {
        return;
      }

      this.employees.forEach((employee) => {
        // Attendance Chart
        const attendanceCtx = document.getElementById(`attendance${employee.id}`);
        if (attendanceCtx) {
          // Destroy existing chart instance to prevent conflicts on re-render/data update
          if (attendanceCtx.chart) {
            attendanceCtx.chart.destroy();
          }
          attendanceCtx.chart = new Chart(attendanceCtx, { // Store chart instance on canvas element
            type: 'line',
            data: {
              labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], // Assuming fixed labels for weekly attendance
              datasets: [{
                label: 'Attendance',
                data: employee.attendanceData, // Dynamic data from employee object
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                tension: 0.3,
                fill: true
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                title: { display: true, text: 'Weekly Attendance', font: { size: 10 } }
              },
              scales: {
                x: { ticks: { font: { size: 8 } } },
                y: {
                  min: 0,
                  max: 1, // Attendance is 0 or 1
                  ticks: {
                    font: { size: 8 },
                    callback: (value) => (value === 1 ? 'Present' : 'Absent')
                  }
                }
              }
            }
          });
        }

        // Payroll Chart
        const payrollCtx = document.getElementById(`payroll${employee.id}`);
        if (payrollCtx) {
          // Destroy existing chart instance
          if (payrollCtx.chart) {
            payrollCtx.chart.destroy();
          }
          payrollCtx.chart = new Chart(payrollCtx, { // Store chart instance on canvas element
            type: 'line',
            data: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'], // Assuming fixed labels for monthly salary
              datasets: [{
                label: 'Salary',
                data: employee.salaryData, // Dynamic data from employee object
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                tension: 0.3,
                fill: true
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                title: { display: true, text: 'Monthly Salary', font: { size: 10 } }
              },
              scales: {
                x: { ticks: { font: { size: 8 } } },
                y: {
                  ticks: {
                    font: { size: 8 },
                    callback: (value) => 'R' + value.toLocaleString() // Format as Rxxx,xxx
                  }
                }
              }
            }
          });
        }
      });
    }
  },
  // Optional: Clean up charts when component is unmounted
  beforeUnmount() {
    this.employees.forEach(employee => {
      const attendanceCtx = document.getElementById(`attendance${employee.id}`);
      if (attendanceCtx && attendanceCtx.chart) {
        attendanceCtx.chart.destroy();
      }
      const payrollCtx = document.getElementById(`payroll${employee.id}`);
      if (payrollCtx && payrollCtx.chart) {
        payrollCtx.chart.destroy();
      }
    });
  }
}
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>