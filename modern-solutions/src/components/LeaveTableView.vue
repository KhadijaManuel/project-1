<template>
  <table class="leave-table">
    <thead>
      <tr>
        <th>Employee ID</th>
        <th>Employee Name</th>
        <th>Date</th>
        <th>Reason</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="leave in leaves" :key="leave.id">
        <td>{{ leave.employeeId }}</td>
        <td>{{ leave.employeeName }}</td>
        <td>{{ leave.date }}</td>
        <td>{{ leave.reason }}</td>
        <td>{{ leave.status }}</td>
        <td>
          <button @click="$emit('delete-leave', leave.id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    leaves: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.leave-table {
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  margin-top: 1rem;
}

.leave-table th,
.leave-table td {
  padding: 10px;
  border: 1px solid white;
  text-align: left;
}

.leave-table th {
  background-color: rgb(60, 180, 164);
  color: white;
}

.leave-table button {
  padding: 4px 8px;
  font-size: 0.9rem;
  cursor: pointer;
  background-color: red;
  color: white;
  border: none;
  border-radius: 4px;
}

.leave-table tr:hover {
  background-color: whitesmoke;
  transition: background-color 0.3s ease;
}
</style>
