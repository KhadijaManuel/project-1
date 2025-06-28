<template>
  <div :class="{ 'dark': isDarkMode }" class="max-w-4xl mx-auto p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg transition-colors duration-300">
    <h3 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Employee Payroll</h3>

    <!-- Dark Mode Toggle -->
    <div class="flex items-center mb-4">
      <label class="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" v-model="isDarkMode" @change="toggleDarkMode" class="sr-only" aria-label="Toggle dark mode" />
        <div class="w-11 h-6 bg-gray-200 dark:bg-gray-600 rounded-full shadow-inner"></div>
        <div
          class="absolute w-5 h-5 bg-white dark:bg-gray-300 rounded-full shadow transition-transform duration-200 ease-in-out"
          :class="{ 'transform translate-x-5': isDarkMode }"
        ></div>
      </label>
      <span class="ml-3 text-gray-700 dark:text-gray-300">{{ isDarkMode ? 'Dark Mode' : 'Light Mode' }}</span>
    </div>

    <div v-if="error" class="text-red-500 dark:text-red-400 mb-2">{{ error }}</div>

    <table class="min-w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-sm text-gray-900 dark:text-gray-100" v-if="payrollData.length">
      <thead class="bg-gray-100 dark:bg-gray-600">
        <tr>
          <th class="border px-4 py-2">Employee ID</th>
          <th class="border px-4 py-2">Name</th>
          <th class="border px-4 py-2">Hourly Rate (R)</th>
          <th class="border px-4 py-2">Hours Worked</th>
          <th class="border px-4 py-2">Leave Deductions</th>
          <th class="border px-4 py-2">Net Pay (R)</th>
          <th class="border px-4 py-2">Final Salary (R)</th>
          <th class="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in payrollData" :key="entry.employeeId" class="hover:bg-gray-50 dark:hover:bg-gray-600">
          <td class="border px-4 py-2">{{ entry.employeeId }}</td>
          <td class="border px-4 py-2">{{ entry.name }}</td>
          <td class="border px-4 py-2">{{ calculateHourlyRate(entry) }}</td>
          <td class="border px-4 py-2">{{ entry.hoursWorked }}</td>
          <td class="border px-4 py-2">{{ calculateLeaveDeductions(entry) }}</td>
          <td class="border px-4 py-2">{{ calculateNetPay(entry) }}</td>
          <td class="border px-4 py-2">{{ entry.finalSalary.toFixed(2) }}</td>
          <td class="border px-4 py-2">
            <button @click="downloadPaycheck(entry)" class="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded" aria-label="Download paycheck for {{ entry.name }}">
              Download Paycheck
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import jsPDF from 'jspdf';

export default {
  name: 'EmployeePayroll',
  data() {
    return {
      isDarkMode: localStorage.getItem('darkMode') === 'true',
    };
  },
  computed: {
    ...mapGetters(['getPayrollData', 'getError', 'isLoading']),
    payrollData() {
      return this.getPayrollData;
    },
    error() {
      return this.getError;
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

<style scoped>
.table-row:hover {
  background-color: whitesmoke;
}
</style>