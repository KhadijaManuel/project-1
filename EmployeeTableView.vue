<template>
  <div class="table-wrapper">
  <table class="employee-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Position</th>
        <th>Department</th>
        <th>Salary</th>
        <th>Employment History</th>
        <th>Contact</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <!-- Loops through employees -->
      <tr v-for="(employee, index) in employees" :key="employee.id">
        <td>{{ employee.id }}</td>
        <td>
          <input v-if="employee.isEditing" v-model="employee.name" />
          <span v-else>{{ employee.name }}</span>
        </td>

        <td>
          <input v-if="employee.isEditing" v-model="employee.position" />
          <span v-else>{{ employee.position }}</span>
        </td>

        <td>
          <input v-if="employee.isEditing" v-model="employee.department" />
          <span v-else>{{ employee.department }}</span>
        </td>

        <td>
          <input v-if="employee.isEditing" v-model="employee.salary" />
          <span v-else>{{ employee.salary }}</span>
        </td>

        <td>
          <input v-if="employee.isEditing" v-model="employee.history" />
          <span v-else>{{ employee.history }}</span>
        </td>

        <td>
          <input v-if="employee.isEditing" v-model="employee.contact" />
          <span v-else>{{ employee.contact }}</span>
        </td>
        <td>
          <!-- Buttons to edit, update, or delete employee -->
          <button style="border: none;" @click="toggleEdit(employee)">
            {{ employee.isEditing ? 'Update' : 'Edit' }}
          </button>
          <button style="border: none; background-color: red;" @click="deleteEmployee(index)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
  </div>
</template>

<script>
export default {
  props: {
    // Receives the list of employees from the parent component
    employees: {
      type: Array,
      required: true
    }
  },
  methods: {
    // Toggles the editing state of an employee
    toggleEdit(employee) {
      employee.isEditing = !employee.isEditing;
    },
    // Emits an event to delete an employee
    deleteEmployee(index) {
      this.$emit('delete-employee', index);
    }
  }
};
</script>

<style scoped>
.table-wrapper {
  overflow-x: auto;
  max-width: 100%;
}
.employee-table {
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  margin-top: 1rem;
  min-width: 600px;
}

.employee-table th {
  padding: 10px;
  border: 1px solid white;
  text-align: left;
  font-weight: bold;
  background-color: lightseagreen;
  color: white;  
}
.employee-table td {
  padding: 6px;
  border: 1px solid white;
  text-align: left;
}
.employee-table td input {
  width: 100%;
  padding: 5px;
  font-size: 1rem;
  border: none;
  background-color: transparent;
}
.employee-table input {
  width: 100%;
  padding: 5px;
  font-size: 1rem;
}
.employee-table button:hover {
  background-color:rgb(22, 143, 22);
}
.employee-table button {
  margin-right: 5px;
  padding: 4px 8px;
  font-size: 0.8rem;
  color: white;
  cursor: pointer;
  background-color: lightseagreen;
}
.employee-table tr { 
  transition: border-color 0.5s ease, background-color 0.5s ease, transform 0.5s ease;
}
.employee-table tr:hover {
  transform: scale(1.01); 
}
.employee-table tr:active {
  transform: scale(0.96); 
}
/* Responsiveness */
@media screen and (max-width: 900px) {
  .employee-table th:nth-child(6),
  .employee-table td:nth-child(6),
  .employee-table th:nth-child(7),
  .employee-table td:nth-child(7) {
    display: none;
  }
}
@media screen and (max-width: 600px) {
  .employee-table th,
  .employee-table td {
    padding: 6px;
    font-size: 12px;
  }
  .employee-table th:nth-child(4),
  .employee-table td:nth-child(4),
  .employee-table th:nth-child(5),
  .employee-table td:nth-child(5) {
    display: none;
  }
}

</style>