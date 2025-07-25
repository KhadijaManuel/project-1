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
          <table
            class="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-lg shadow-sm">
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
                :key="entry.payroll_id || entry.employee_id"
                class="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <td class="border-r px-6 py-3">{{ entry.employee_id }}</td>
                <td class="border-r px-6 py-3 font-medium">{{ entry.first_name }} {{ entry.last_name }}</td>
                <td class="border-r px-6 py-3">{{ calculateHourlyRate(entry) }}</td>
                <td class="border-r px-6 py-3">{{ entry.hours_worked }}</td>
                <td class="border-r px-6 py-3">{{ calculateLeaveDeductions(entry) }}</td>
                <td class="border-r px-6 py-3">{{ formatNumber(entry.net_pay) }}</td>
                <td class="border-r px-6 py-3">
                  {{ (Number(entry.base_salary) - Number(entry.deductions)).toFixed(2) }}
                </td>
                <td class="px-6 py-3 space-x-2">
                  <!-- Download -->
                  <button
                    @click="downloadPaycheck(entry)"
                    class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition">
                    Download
                  </button>
                  <!-- Update -->
                  <button
                    @click="updatePayroll(entry)"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition">
                    Update
                  </button>
                  <!-- Delete -->
                  <button
                    @click="deletePayroll(entry.payroll_id)"
                    class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition">
                    Delete
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
import jsPDF from 'jspdf';
import axios from 'axios';

export default {
  name: 'EmployeePayroll',
  components: { CardComp },
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
    // format numbers safely
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

    // PDF download function using jspdf 
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

    // Delete payroll data in the database 
    async deletePayroll(id) {
      if (!confirm('Are you sure you want to delete this payroll record?')) return;
      try {
        await axios.delete(`http://localhost:5000/payroll/${id}`);
        this.$store.dispatch('fetchPayrollData');
        alert('✅ Payroll record deleted.');
      } catch (err) {
        console.error('Delete error:', err);
        alert('❌ Failed to delete payroll record.');
      }
    },

    // Update payroll
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
        this.$store.dispatch('fetchPayrollData');
        alert('✅ Payroll record updated.');
      } catch (err) {
        console.error('Update error:', err);
        alert('❌ Failed to update payroll record.');
      }
    },
  },
};
</script>
