<template>
  <div class="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <main class="flex-1 p-6 space-y-6 overflow-y-auto">
      <CardComp class="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <h2 class="text-3xl font-bold text-blue-700 dark:text-blue-400">
            Employee Payroll
          </h2>
          <div class="flex gap-3">
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Search by name..."
              class="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              @click="refreshData"
              class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm shadow-md"
            >
              Refresh
            </button>
          </div>
        </div>

        <div class="text-right text-sm mb-2 text-gray-600 dark:text-gray-300">
          Total Records: <strong>{{ filteredPayroll.length }}</strong> | Total Payout: 
          <strong>R {{ calculateTotalPayout() }}</strong>
        </div>

        <div class="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
            <thead class="bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-left">
              <tr>
                <th class="px-4 py-3 font-semibold">ID</th>
                <th class="px-4 py-3 font-semibold">Name</th>
                <th class="px-4 py-3 font-semibold">Hourly Rate (R)</th>
                <th class="px-4 py-3 font-semibold">Hours</th>
                <th class="px-4 py-3 font-semibold">Leave Deductions</th>
                <th class="px-4 py-3 font-semibold">Net Pay (R)</th>
                <th class="px-4 py-3 font-semibold">Final Salary (R)</th>
                <th class="px-4 py-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
              <tr
                v-for="entry in filteredPayroll"
                :key="entry.payroll_id || entry.employee_id"
                class="hover:bg-blue-50 dark:hover:bg-blue-800 transition"
              >
                <td class="px-4 py-3">{{ entry.employee_id }}</td>
                <td class="px-4 py-3 font-medium">{{ entry.first_name }} {{ entry.last_name }}</td>
                <td class="px-4 py-3">R {{ calculateHourlyRate(entry) }}</td>
                <td class="px-4 py-3">{{ entry.hours_worked }}</td>
                <td class="px-4 py-3">R {{ calculateLeaveDeductions(entry) }}</td>
                <td class="px-4 py-3">R {{ formatNumber(entry.net_pay) }}</td>
                <td class="px-4 py-3">
                  R {{ (Number(entry.base_salary) - Number(entry.deductions)).toFixed(2) }}
                </td>
                <td class="px-4 py-3 text-center space-x-2 whitespace-nowrap">
                  <button
                    @click="downloadPaycheck(entry)"
                    class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md transition"
                  >
                    Download
                  </button>
                  <button
                    @click="updatePayroll(entry)"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition"
                  >
                    Update
                  </button>
                  <button
                    @click="deletePayroll(entry.payroll_id)"
                    class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="error" class="mt-4 text-red-600 dark:text-red-400 font-semibold">
          {{ error }}
        </div>
      </CardComp>
    </main>
  </div>
</template>

<script>
import CardComp from '@/components/CardComp.vue';
import jsPDF from 'jspdf';
import axios from 'axios';

export default {
  name: 'EmployeePayroll',
  components: { CardComp },
  data() {
    return {
      isDarkMode: localStorage.getItem('darkMode') === 'true',
      searchTerm: '',
    };
  },
  computed: {
    payrollData() {
      return this.$store.getters.getPayrollData;
    },
    error() {
      return this.$store.getters.getError;
    },
    filteredPayroll() {
      if (!this.searchTerm) return this.payrollData;
      return this.payrollData.filter((emp) =>
        (emp.first_name + ' ' + emp.last_name).toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },
  created() {
    this.$store.dispatch('fetchPayrollData');
  },
  mounted() {
    document.documentElement.classList.toggle('dark', this.isDarkMode);
  },
  methods: {
    refreshData() {
      this.$store.dispatch('fetchPayrollData');
    },
    formatNumber(value) {
      if (value === null || value === undefined || value === '') return '0.00';
      const num = Number(value);
      return isNaN(num) ? '0.00' : num.toFixed(2);
    },
    calculateHourlyRate(entry) {
      const hours = Number(entry.hours_worked) || 160;
      const net = Number(entry.net_pay) || 0;
      return (net / hours).toFixed(2);
    },
    calculateLeaveDeductions(entry) {
      const hourlyRate = this.calculateHourlyRate(entry);
      const leaveDays = Number(entry.leave_deductions) || 0;
      const dailyIncome = Number(hourlyRate) * 8;
      return (dailyIncome * leaveDays).toFixed(2);
    },
    calculateTotalPayout() {
      return this.filteredPayroll
        .reduce((sum, emp) => sum + (Number(emp.net_pay) || 0), 0)
        .toFixed(2);
    },
    downloadPaycheck(emp) {
      const doc = new jsPDF();
      const content = `
        Paycheck for: ${emp.first_name} ${emp.last_name}
        Monthly Salary: R ${this.formatNumber(emp.base_salary)}
        Hours Worked: ${emp.hours_worked}
        Leave Deductions: R ${this.calculateLeaveDeductions(emp)}
        Net Pay: R ${this.formatNumber(emp.net_pay)}
      `;
      const lines = content.trim().split('\n');
      let y = 10;
      lines.forEach(line => {
        doc.text(line.trim(), 10, y);
        y += 10;
      });
      doc.save(`Paycheck_${emp.employee_id}.pdf`);
    },
    async deletePayroll(id) {
      if (!confirm('Are you sure you want to delete this payroll record?')) return;
      try {
        await axios.delete(`http://localhost:5000/payroll/${id}`);
        this.refreshData();
        alert('Payroll record deleted.');
      } catch (err) {
        console.error('Delete error:', err);
        alert('Failed to delete payroll record.');
      }
    },
    async updatePayroll(entry) {
      const newNetPay = prompt('Enter new Net Pay:', entry.net_pay);
      if (newNetPay === null) return;
      try {
        await axios.put(`http://localhost:5000/payroll/${entry.payroll_id}`, {
          base_salary: entry.base_salary,
          deductions: entry.deductions,
          net_pay: Number(newNetPay),
          hours_worked: entry.hours_worked,
          leave_deductions: entry.leave_deductions,
        });
        this.refreshData();
        alert('Payroll record updated.');
      } catch (err) {
        console.error('Update error:', err);
        alert('Failed to update payroll record.');
      }
    },
  },
};
</script>
