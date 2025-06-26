<template>
  <div class="page">
    <h2 class="page-title">Leave Management</h2>

    <div class="filter-buttons">
        <h3>Filter by Status:</h3>
      <button @click="filterStatus = 'All'">All</button>
      <button @click="filterStatus = 'Pending'">Pending</button>
      <button @click="filterStatus = 'Approved'">Approved</button>
      <button @click="filterStatus = 'Denied'">Denied</button>
    </div>

    <div class="table-container">
      <LeaveTableView :leaves="filteredLeaves" @delete-leave="deleteLeave" />
    </div>

    <div class="form-container">
      <h3 style="text-align: left;">New Leave Request:</h3>
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
        const response = await fetch('/data/attendance.json');
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
      // Validation to ensure all fields are filled  
      if (!this.newLeave.employeeName || !this.newLeave.date || !this.newLeave.reason.trim() || !this.newLeave.status.trim()) {
            alert('Please fill in all fields.');
            return;
        }
         // Split the name into parts
        const nameParts = this.newLeave.employeeName.trim().split(' ');
        if (nameParts.length < 2) {
            alert('Please enter both first name and surname.');
            return;
        }
        const firstName = nameParts[0];
        const surname = nameParts[1];

        // Check that both first letter of first name and surname are uppercase
        if (
        firstName[0] !== firstName[0].toUpperCase() ||
        surname[0] !== surname[0].toUpperCase()
        ) {
       alert('Both first name and surname must start with a capital letter.');
      return;
      } 
      // Validation to ensure the leave date is not in the past
      const today = new Date();
      const leaveDate = new Date(this.newLeave.date);
      today.setHours(0, 0, 0, 0);
      leaveDate.setHours(0, 0, 0, 0);
      if (leaveDate < today) {
        alert('Leave date cannot be in the past.');
        return;
      }
        // Validation to ensure no duplicate leave requests for the same employee on the same date
        if (this.leaves.some(leave => leave.employeeName === this.newLeave.employeeName && leave.date === this.newLeave.date)) {
            alert('Leave request for this employee on this date already exists.');
            return;
        }
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
      if (confirm(`Are you sure you want to delete this leave request?`)) {
        this.leaves = this.leaves.filter(l => l.id !== id);
        alert(`Leave request will be deleted in a moment.`);
      }
      else {
        alert(`Leave request was not deleted.`);
      }
      
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
