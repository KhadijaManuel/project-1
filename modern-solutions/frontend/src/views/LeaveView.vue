<template>
  <div class="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
    <!-- Main Content -->
    <main class="flex-1 p-8">

      <!-- Page Title -->
      <h2 class="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400">Leave Management</h2>

      <!-- Filter Buttons -->
      <div class="mb-6">
        <h5 class="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Filter by Status:</h5>
        <div class="flex flex-wrap gap-3">
          <button
            class="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded"
            @click="filterStatus = 'All'"
          >All</button>
          <button
            class="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded"
            @click="filterStatus = 'Pending'"
          >Pending</button>
          <button
            class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            @click="filterStatus = 'Approved'"
          >Approved</button>
          <button
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            @click="filterStatus = 'Denied'"
          >Denied</button>
        </div>
      </div>

      <!-- Leave Table -->
      <div class="mb-10">
        <LeaveTableView :leaves="filteredLeaves" @delete-leave="deleteLeave" />
      </div>

      <!-- Leave Form -->
      <div class="flex justify-center mt-10">
        <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-xl">
          <h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">New Leave Request</h3>
          <form @submit.prevent="addLeave" class="space-y-4">
            <input
              v-model="newLeave.employeeName"
              placeholder="Employee Name"
              required
              class="w-full border border-gray-300 dark:border-gray-600 rounded px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring focus:ring-blue-300"
            />
            <input
              v-model="newLeave.date"
              type="date"
              required
              class="w-full border border-gray-300 dark:border-gray-600 rounded px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring focus:ring-blue-300"
            />
            <input
              v-model="newLeave.reason"
              placeholder="Reason"
              required
              class="w-full border border-gray-300 dark:border-gray-600 rounded px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring focus:ring-blue-300"
            />
            <input
              v-model="newLeave.status"
              placeholder="Status (e.g. Pending)"
              required
              class="w-full border border-gray-300 dark:border-gray-600 rounded px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring focus:ring-blue-300"
            />
            <button
              type="submit"
              class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition"
            >
              Submit Leave Request
            </button>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

  <script>
  import LeaveTableView from '@/components/LeaveTableView.vue';
  import SidebarComp from '@/components/SidebarComp.vue';

  export default {
    components: { LeaveTableView, SidebarComp },
    data() {
      return {
        leaves: [],
        filterStatus: 'All',
        newLeave: {
          employeeName: '',
          date: '',
          reason: '',
          status: ''
        }
      };
    },
    computed: {
      filteredLeaves() {
        if (this.filterStatus === 'All') return this.leaves;
        return this.leaves.filter(
          leave => leave.status.toLowerCase() === this.filterStatus.toLowerCase()
        );
      }
    },
    async mounted() {
      await this.fetchLeaves();
    },
    methods: {
      async fetchLeaves() {
        try {
          const response = await fetch('/dummy-data/attendance.json');
          const data = await response.json();

          const flatLeaves = [];

          data.attendanceAndLeave.forEach((employee) => {
            employee.leaveRequests.forEach((leave, index) => {
              flatLeaves.push({
                id: `${employee.employeeId}-${index}`,
                leaveId: flatLeaves.length + 1,
                employeeId: employee.employeeId,
                employeeName: employee.name,
                date: leave.date,
                reason: leave.reason,
                status: leave.status
              });
            });
          });

          this.leaves = flatLeaves;
        } catch (error) {
          console.error('Error loading leaves:', error);
        }
      },
      addLeave() {
        const newId = this.leaves.length
          ? this.leaves[this.leaves.length - 1].employeeId + 1
          : 1;

        this.leaves.push({
          id: `${newId}-${Date.now()}`,
          employeeId: newId,
          ...this.newLeave
        });

        this.newLeave = {
          employeeName: '',
          date: '',
          reason: '',
          status: ''
        };
      },
      deleteLeave(id) {
        this.leaves = this.leaves.filter(l => l.id !== id);
      }
    }
  };
  </script>
