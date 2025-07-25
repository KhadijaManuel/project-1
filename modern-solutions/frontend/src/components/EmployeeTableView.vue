<template>
  <table class="min-w-full bg-white dark:bg-gray-800">
    <thead>
      <tr class="bg-teal-600 text-white">
        <th class="px-4 py-3">ID</th>
        <th class="px-4 py-3">Name</th>
        <th class="px-4 py-3">Role</th>
        <th class="px-4 py-3">Email</th>
        <th class="px-4 py-3">Salary</th>
        <th class="px-4 py-3">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="emp in employees"
        :key="emp.employee_id"
        class="border-b hover:bg-gray-100"
      >
        <td class="px-4 py-2">{{ emp.employee_id }}</td>
        <td class="px-4 py-2">{{ emp.first_name }} {{ emp.last_name }}</td>
        <td class="px-4 py-2">{{ emp.role }}</td>
        <td class="px-4 py-2">{{ emp.email }}</td>
        <td class="px-4 py-2">{{ emp.salary }}</td>
        <td class="px-4 py-2 flex gap-2">
          <button @click="$emit('edit', emp)" class="bg-blue-600 text-white px-3 py-1 rounded">Edit</button>
          <button @click="$emit('delete', emp.employee_id)" class="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    employees: { type: Array, required: true }
  }
}
</script>
