<template>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead class="bg-teal-600 text-white text-left text-sm uppercase">
        <tr>
          <th class="px-4 py-3">ID</th>
          <th class="px-4 py-3">Name</th>
          <th class="px-4 py-3">Position</th>
          <th class="px-4 py-3">Department</th>
          <th class="px-4 py-3">Salary</th>
          <th class="px-4 py-3 hidden lg:table-cell">Employment History</th>
          <th class="px-4 py-3 hidden lg:table-cell">Contact</th>
          <th class="px-4 py-3">Actions</th>
        </tr>
      </thead>
      <tbody class="text-gray-700 text-sm">
        <tr
          v-for="(employee, index) in employees"
          :key="employee.id"
          class="border-b hover:bg-gray-50 transition-transform duration-200 hover:scale-[1.01] active:scale-95"
        >
          <td class="px-4 py-2 font-medium">{{ employee.id }}</td>

          <td class="px-4 py-2">
            <input
              v-if="employee.isEditing"
              v-model="employee.name"
              class="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none"
            />
            <span v-else>{{ employee.name }}</span>
          </td>

          <td class="px-4 py-2">
            <input
              v-if="employee.isEditing"
              v-model="employee.position"
              class="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none"
            />
            <span v-else>{{ employee.position }}</span>
          </td>

          <td class="px-4 py-2">
            <input
              v-if="employee.isEditing"
              v-model="employee.department"
              class="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none"
            />
            <span v-else>{{ employee.department }}</span>
          </td>

          <td class="px-4 py-2">
            <input
              v-if="employee.isEditing"
              v-model="employee.salary"
              class="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none"
            />
            <span v-else>{{ employee.salary }}</span>
          </td>

          <td class="px-4 py-2 hidden lg:table-cell">
            <input
              v-if="employee.isEditing"
              v-model="employee.history"
              class="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none"
            />
            <span v-else>{{ employee.history }}</span>
          </td>

          <td class="px-4 py-2 hidden lg:table-cell">
            <input
              v-if="employee.isEditing"
              v-model="employee.contact"
              class="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none"
            />
            <span v-else>{{ employee.contact }}</span>
          </td>

          <td class="px-4 py-2 flex gap-2">
            <button
              @click="toggleEdit(employee)"
              class="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded text-xs font-semibold transition"
            >
              {{ employee.isEditing ? 'Update' : 'Edit' }}
            </button>
            <button
              @click="deleteEmployee(index)"
              class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-semibold transition"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    employees: {
      type: Array,
      required: true
    }
  },
  methods: {
    toggleEdit(employee) {
      employee.isEditing = !employee.isEditing;
    },
    deleteEmployee(index) {
      this.$emit('delete-employee', index);
    }
  }
};
</script>

<style scoped>
/* No custom styles needed — all Tailwind */
</style>
