<template>
  <div class="flex h-screen bg-gray-100 dark:bg-gray-900">

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto p-6">
      <CardComp class="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
           <div class="mb-8">
          <h2 class="text-3xl font-extrabold text-blue-700 dark:text-blue-400 tracking-tight">
            Employee Payroll
          </h2>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-lg shadow-sm">
            <thead class="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th class="border-r px-6 py-3 font-semibold text-left">Employee ID</th>
                <th class="border-r px-6 py-3 font-semibold text-left">Name</th>
                <th class="border-r px-6 py-3 font-semibold text-left">Hourly Rate (R)</th>
                <th class="border-r px-6 py-3 font-semibold text-left">Hours Worked</th>
                <th class="border-r px-6 py-3 font-semibold text-left">Leave Deductions</th>
                <th class="border-r px-6 py-3 font-semibold text-left">Net Pay (R)</th>
                <th class="border-r px-6 py-3 font-semibold text-left">Final Salary (R)</th>
                <th class="px-6 py-3 font-semibold text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="entry in payrollData"
                :key="entry.employeeId"
                class="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <td class="border-r px-6 py-3">{{ entry.employeeId }}</td>
                <td class="border-r px-6 py-3 font-medium">{{ entry.name }}</td>
                <td class="border-r px-6 py-3">{{ calculateHourlyRate(entry) }}</td>
                <td class="border-r px-6 py-3">{{ entry.hoursWorked }}</td>
                <td class="border-r px-6 py-3">{{ calculateLeaveDeductions(entry) }}</td>
                <td class="border-r px-6 py-3">{{ calculateNetPay(entry) }}</td>
                <td class="border-r px-6 py-3">{{ entry.finalSalary.toFixed(2) }}</td>
                <td class="px-6 py-3">
                  <button
                    @click="downloadPaycheck(entry)"
                    class="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded transition"
                  >
                    Download
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="error" class="text-red-600 dark:text-red-400 mt-4 font-semibold">
          {{ error }}
        </div>
      </CardComp>
    </main>
  </div>
</template>

<script>
import CardComp from '@/components/CardComp.vue';
import SidebarComp from '@/components/SidebarComp.vue';
import jsPDF from 'jspdf';

export default {
  name: 'EmployeePayroll',
  components: { CardComp, SidebarComp },
  data() {
    return {
      isDarkMode: localStorage.getItem('darkMode') === 'true',
    };
  },
  computed: {
    payrollData() {
      return this.$store.getters.getPayrollData;
    },
    error() {
      return this.$store.getters.getError;
    },
  },
  created() {
    this.$store.dispatch('fetchPayrollData');
  },
  mounted() {
    document.documentElement.classList.toggle('dark', this.isDarkMode);
  },
  methods: {
    toggleDarkMode() {
      localStorage.setItem('darkMode', this.isDarkMode);
      document.documentElement.classList.toggle('dark', this.isDarkMode);
    },
    calculateHourlyRate(entry) {
      const hours = entry.hoursWorked || 160;
      return (entry.finalSalary / hours).toFixed(2);
    },
    calculateLeaveDeductions(entry) {
      const hourlyRate = this.calculateHourlyRate(entry);
      const leaveDays = entry.leaveDeductions || 0;
      const dailyIncome = hourlyRate * 8;
      return (dailyIncome * leaveDays).toFixed(2);
    },
    calculateNetPay(entry) {
      const deductions = this.calculateLeaveDeductions(entry);
      return (entry.finalSalary - deductions).toFixed(2);
    },
    downloadPaycheck(emp) {
      const doc = new jsPDF();
      const content = `
        Paycheck for: ${emp.name}
        Monthly Salary: R ${emp.finalSalary.toLocaleString('en-ZA')}
        Hours Worked: ${emp.hoursWorked}
        Leave Deductions: R ${this.calculateLeaveDeductions(emp)}
        Net Pay: R ${this.calculateNetPay(emp)}
      `;
      const lines = content.trim().split('\n');
      let y = 10;

      lines.forEach(line => {
        doc.text(line.trim(), 10, y);
        y += 10;
      });

      doc.save(`Paycheck_${emp.employeeId}.pdf`);
    }
  }
};
</script>
