<template>
  <div class="page">
    <h2 class="page-title">Employee Management</h2>

    <div class="table-container">
      <EmployeeTableView :employees="employees" />
    </div>

    <div class="form-container">
      <h3 style="text-align: left;">Add New Employee</h3>
      <form @submit.prevent="addEmployee">
        <input v-model="newEmployee.name" placeholder="Name" required />
        <input v-model="newEmployee.position" placeholder="Position" required />
        <input v-model="newEmployee.department" placeholder="Department" required />
        <input v-model="newEmployee.salary" type="number" placeholder="Salary" required />
        <input v-model="newEmployee.history" placeholder="Employment History" />
        <input v-model="newEmployee.contact" placeholder="Contact" required />
        <button type="submit">Add</button>
      </form>
    </div>
  </div>
</template>

<script>
import EmployeeTableView from '@/components/EmployeeTableView.vue';

export default {
  components: { EmployeeTableView },
  data() {
    return {
      employees: [],
      newEmployee: {
        name: '',
        position: '',
        department: '',
        salary: '',
        history: '',
        contact: ''
      }
    };
  },
  async mounted() {
    await this.fetchInfo();
  },
  methods: {
    async fetchInfo() {
      try {
        const response = await fetch('/dummy-data/employee_info.json');
        const info = await response.json();
        this.employees = info.employeeInformation.map(item => ({
          id: item.employeeId,
          name: item.name,
          position: item.position,
          department: item.department,
          salary: item.salary,
          history: item.employmentHistory,
          contact: item.contact,
          isEditing: false
        }));
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    },
    addEmployee() {
      const newId = this.employees.length
        ? this.employees[this.employees.length - 1].id + 1
        : 1;

      this.employees.push({
        id: newId,
        ...this.newEmployee,
        isEditing: false
      });

      this.newEmployee = {
        name: '',
        position: '',
        department: '',
        salary: '',
        history: '',
        contact: ''
      };
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
  background-color: lightseagreen;
  color: white;
  border: none;
  cursor: pointer;
}
.form-container button:hover {
  background-color:rgb(56, 250, 56);
}
.form-container input:hover {
  box-shadow: black;
  transform: scale(1.02)
}
</style>