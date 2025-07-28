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
      employees: [], 
      loading: true,  
      error: null     
    }
  },
  async mounted() {
    await this.fetchEmployees(); // Fetch data 
    if (!this.error) { 
      this.createCharts();
    }
  },
  methods: {
    async fetchEmployees() {
      this.loading = true; 
      this.error = null;   

      try {
       
        const response = await fetch('YOUR_ACTUAL_API_ENDPOINT_HERE');

        if (!response.ok) {
          
          const errorMessage = `HTTP error! Status: ${response.status} - ${response.statusText}`;
          throw new Error(errorMessage);
        }

        const data = await response.json();

      
        if (!Array.isArray(data) || data.some(item => !item.id || !item.name || !item.photo)) {
          throw new Error('Fetched data is not in the expected format.');
        }

        this.employees = data;
      } catch (err) {
        console.error("Failed to fetch employees:", err);
        this.error = `Failed to load employee data. Please try again. (${err.message})`;
        this.employees = []; 
      } finally {
        this.loading = false; 
      }
    },
    createCharts() {
      
      if (this.employees.length === 0) {
        return;
      }

      this.employees.forEach((employee) => {
        
        const attendanceCtx = document.getElementById(`attendance${employee.id}`);
        if (attendanceCtx) {
          
          if (attendanceCtx.chart) {
            attendanceCtx.chart.destroy();
          }
          attendanceCtx.chart = new Chart(attendanceCtx, { 
            type: 'line',
            data: {
              labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], 
              datasets: [{
                label: 'Attendance',
                data: employee.attendanceData, 
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
                  max: 1, 
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
          
          if (payrollCtx.chart) {
            payrollCtx.chart.destroy();
          }
          payrollCtx.chart = new Chart(payrollCtx, { 
            type: 'line',
            data: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'], 
              datasets: [{
                label: 'Salary',
                data: employee.salaryData, 
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
                    callback: (value) => 'R' + value.toLocaleString() 
                  }
                }
              }
            }
          });
        }
      });
    }
  },
  
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
</style>