<template>
  <div class="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
    <main class="flex-1 p-8">

      <h2 class="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400">Leave Management</h2>

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

      <div class="mb-10">
        <LeaveTableView :leaves="filteredLeaves" @delete-leave="deleteLeave" />
      </div>

      <div class="flex justify-center mt-10">
        <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-xl">
          <h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">New Leave Request</h3>
          <form @submit.prevent="addLeave" class="space-y-4">
            <input
              v-model.number="newLeave.employee_id"
              type="number"
              placeholder="Employee ID"
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
            <select
              v-model="newLeave.status"
              required
              class="w-full border border-gray-300 dark:border-gray-600 rounded px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring focus:ring-blue-300"
            >
              <option value="" disabled>Select Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Denied">Denied</option>
            </select>
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
// If SidebarComp is not used in this specific view, it can be removed
// import SidebarComp from '@/components/SidebarComp.vue';

export default {
  components: { LeaveTableView /* , SidebarComp */ },
  data() {
    return {
      leaves: [],
      filterStatus: 'All',
      newLeave: {
        employee_id: null, // Corresponds to `employee_id` in your backend
        date: '',          // Corresponds to `leave_date` in your backend
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
        const response = await fetch('http://localhost:5000/leaves', {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Map backend response to frontend's expected structure for display
        this.leaves = data.map(l => ({
          id: l.leave_id, // Use backend's leave_id as unique key for Vue
          employeeId: l.employee_id,
          employeeName: `${l.first_name} ${l.last_name}`, // Assuming your backend query returns these
          date: l.leave_date, // Match frontend display field to backend field
          reason: l.reason,
          status: l.status,
        }));
      } catch (error) {
        console.error('Error fetching leaves:', error);
        // Optionally display user-friendly error message
      }
    },

    async addLeave() {
      try {
        // Prepare payload to match backend's `addLeaveRequest` expected fields
        const payload = {
          employee_id: this.newLeave.employee_id,
          leave_date: this.newLeave.date, // Map frontend 'date' to backend 'leave_date'
          reason: this.newLeave.reason,
          status: this.newLeave.status,
        };

        const response = await fetch('http://localhost:5000/leaves', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        // Refetch leaves to update the table with the newly added entry
        await this.fetchLeaves();
        this.resetForm(); // Clear the form
      } catch (error) {
        console.error('Error adding leave request:', error);
        // Optionally display user-friendly error message
      }
    },

    async deleteLeave(id) {
      if (!confirm('Are you sure you want to delete this leave request?')) {
        return;
      }
      try {
        const response = await fetch(`http://localhost:5000/leaves/${id}`, {
          method: 'DELETE',
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        // Refetch leaves to update the table after deletion
        await this.fetchLeaves();
      } catch (error) {
        console.error('Error deleting leave request:', error);
        // Optionally display user-friendly error message
      }
    },

    resetForm() {
      this.newLeave = {
        employee_id: null,
        date: '',
        reason: '',
        status: ''
      };
    }
  }
};
</script>