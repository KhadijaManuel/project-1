<template>
  <div class="overflow-x-auto mt-6">
    <table class="min-w-full text-sm text-left text-gray-700 bg-white shadow-md rounded-lg overflow-hidden">
      <thead class="bg-teal-600 text-white">
        <tr>
          <th class="px-6 py-3 text-black">Employee ID</th>
          <th class="px-6 py-3 text-black">Employee Name</th>
          <th class="px-6 py-3 text-black">Date</th>
          <th class="px-6 py-3 text-black">Reason</th>
          <th class="px-6 py-3 text-black">Status</th>
          <th class="px-6 py-3 text-black">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="leave in leaves"
          :key="leave.id"
          class="border-b hover:bg-gray-50 transition duration-200"
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
                  'bg-green-100 text-green-800': leave.status === 'Approved',
                  'bg-yellow-100 text-yellow-800': leave.status === 'Pending',
                  'bg-red-100 text-red-800': leave.status === 'Denied'
                }
              ]"
            >
              {{ leave.status }}
            </span>
          </td>
          <td class="px-6 py-4">
            <button
              @click="$emit('delete-leave', leave.id)"
              class="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-1 rounded shadow"
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
