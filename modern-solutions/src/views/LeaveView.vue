<template>
  <div class="page">
    <h2 class="page-title">Leave Management</h2>

    <div class="filter-buttons">
        <h5>Filter by Status:</h5>
      <button @click="filterStatus = 'All'">All</button>
      <button @click="filterStatus = 'Pending'">Pending</button>
      <button @click="filterStatus = 'Approved'">Approved</button>
      <button @click="filterStatus = 'Denied'">Denied</button>
    </div>

    <div class="table-container">
      <LeaveTableView :leaves="filteredLeaves" @delete-leave="deleteLeave" />
    </div>

    <div class="form-container">
      <h3 style="text-align: left;">New Leave Request</h3>
      <form @submit.prevent="addLeave">
        <input v-model="newLeave.employeeName" placeholder="Employee Name" required />
        <input v-model="newLeave.date" type="date" required />
        <input v-model="newLeave.reason" placeholder="Reason" required />
        <input v-model="newLeave.status" placeholder="Status (e.g. Pending)" required />
        <button type="submit">Submit Leave Request</button>
      </form>
    </div>
  </div>
</template>

<script>
import LeaveTableView from '@/components/LeaveTableView.vue';

export default {
  components: { LeaveTableView },
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

<style scoped>
.page {
  padding: 0rem;
}
.page-title {
  margin-bottom: 0rem;
}

.filter-buttons {
  margin-bottom: 1rem;
}
.filter-buttons button {
  margin-right: 10px;
  padding: 0.5rem 1rem;
  background-color: rgb(38, 186, 172);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.filter-buttons button:hover {
  background-color: lightgrey;
}

.table-container {
  margin-bottom: 2rem;
}

.form-container {
  margin-top: 2rem;
}
.form-container form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 400px;
}
.form-container input {
  padding: 0.5rem;
  font-size: 1rem;
}
.form-container button {
  padding: 0.5rem;
  background-color: rgb(60, 180, 164);
  color: white;
  border: none;
  cursor: pointer;
}
</style>
