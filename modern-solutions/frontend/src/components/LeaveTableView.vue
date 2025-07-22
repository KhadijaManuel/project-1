<template>
  <div class="overflow-x-auto mt-6 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
    <table class="min-w-full text-sm text-left bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-100 shadow-md rounded-lg overflow-hidden">
      <thead class="bg-teal-600 text-white">
        <tr>
          <th class="px-6 py-3">Employee ID</th>
          <th class="px-6 py-3">Employee Name</th>
          <th class="px-6 py-3">Date</th>
          <th class="px-6 py-3">Reason</th>
          <th class="px-6 py-3">Status</th>
          <th class="px-6 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="leave in leaves"
          :key="leave.id"
          class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200"
        >
          <td class="px-6 py-4">{{ leave.employeeId }}</td>
          <td class="px-6 py-4">{{ leave.employeeName }}</td>
          <td class="px-6 py-4">{{ leave.date }}</td>
          <td class="px-6 py-4">{{ leave.reason }}</td>
          <td class="px-6 py-4">
            <span
              :class="[
                'inline-block px-3 py-1 rounded-full text-xs font-semibold',
                {
                  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': leave.status === 'Approved',
                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200': leave.status === 'Pending',
                  'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200': leave.status === 'Denied'
                }
              ]"
            >
              {{ leave.status }}
            </span>
          </td>
          <td class="px-6 py-4">
            <button
              @click="$emit('delete-leave', leave.id)"
              class="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-1 rounded shadow transition"
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
    leaves: {
      type: Array,
      required: true
    }
  }
};
</script>
