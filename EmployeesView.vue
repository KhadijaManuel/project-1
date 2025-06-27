<template>
  <div class="page">
    <h2 class="page-title">Employee Management</h2>
    <!-- Filter input for searching employees -->
    <h3 style="text-align: center;">Filter Employees:</h3>
      <input v-model="filter" placeholder="Search by name, position, or department" />
    <div class="table-container">
      <!-- Table showing filtered employees -->
      <EmployeeTableView :employees="filteredEmployees"
       @delete-employee="deleteEmployee" />
    </div>
    <div class="form-container">
      <h3 style="text-align: left;">Add New Employee:</h3>
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
      // List of employees
      employees: [],
      // Filter string for searching employees
      filter: '',
      // Object to hold new employee info
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
  computed: {
    // Filters the employees based on the input in the search box
    filteredEmployees() {
      return this.employees.filter(employee => {
        return (
          employee.name.toLowerCase().includes(this.filter.toLowerCase()) ||
          employee.position.toLowerCase().includes(this.filter.toLowerCase()) ||
          employee.department.toLowerCase().includes(this.filter.toLowerCase())
        );
      });
    }
  },
  // Loads employee info when the component is mounted
  async mounted() {
    await this.fetchInfo();
  },
  methods: {
    // Fetches employee info from the JSON file
    async fetchInfo() {
      try {
        const response = await fetch('/data/employee_info.json');
        const info = await response.json();
        // Transforms the fetched data into a format suitable for the component
        // and assigns it to the employees array
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
    // Split the name into parts
    const nameParts = this.newEmployee.name.trim().split(' ');
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
    // Position validation
    if (
      !this.newEmployee.position ||
      this.newEmployee.position.length < 2 ||
      this.newEmployee.position[0] !== this.newEmployee.position[0].toUpperCase()
    ) {
      alert('Position must be at least 2 characters and start with a capital letter.');
      return;
    }

    // Department validation
    if (
     !this.newEmployee.department ||
     this.newEmployee.department.length < 2 ||
     this.newEmployee.department[0] !== this.newEmployee.department[0].toUpperCase()
    ) {
      alert('Department must be at least 2 characters and start with a capital letter.');
      return;
    }
    // Employment history validation (must be in format: Joined 2025)
    const historyPattern = /^Joined \d{4}$/;
    if (
    !this.newEmployee.history ||
    !historyPattern.test(this.newEmployee.history.trim())
    ) {
      alert('Employment history must be in the format: Joined 2025');
      return;
    }
  // Salary validation
    if (
      !this.newEmployee.salary ||
      isNaN(this.newEmployee.salary) ||
      Number(this.newEmployee.salary) <= 0
    ) {
      alert('Salary must be a positive number.');
      return;
    }
    // Contact validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      !this.newEmployee.contact ||
      !emailPattern.test(this.newEmployee.contact)
    ) {
      alert('Please enter a valid email address.');
      return;
    } 
    // Adds the new employee
    const newId = this.employees.length
      ? this.employees[this.employees.length - 1].id + 1
      : 1;

      this.employees.push({
        id: newId,
        ...this.newEmployee,
        isEditing: false
      });
      // Resets the form fields
      this.newEmployee = {
        name: '',
        position: '',
        department: '',
        salary: '',
        history: '',
        contact: ''
      };
    },
    deleteEmployee(index){
      const employeeId = this.employees[index].id;
      if (confirm(`Are you sure you want to delete employee ID ${employeeId}?`)) {
        this.employees.splice(index, 1);
        alert(`Employee ID ${employeeId} will be deleted in a moment.`);
      } else {
        alert(`Employee ID ${employeeId} was not deleted.`);
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
  margin-bottom: 1rem;
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
  background-color:rgb(22, 143, 22);
}
.form-container input:hover {
  box-shadow: black;
  transform: scale(1.02)
}
</style>