<template>
  <div class="overflow-x-auto">
    <table class="min-w-full border-collapse border border-gray-300 dark:border-gray-700 mt-4 font-sans text-sm">
      <thead>
        <tr class="bg-teal-600 text-white">
          <th class="px-4 py-2 border border-teal-700">Employee ID</th>
          <th class="px-4 py-2 border border-teal-700">Employee Name</th>
          <th class="px-4 py-2 border border-teal-700">Review Period</th>
          <th class="px-4 py-2 border border-teal-700">Reviewer</th>
          <th class="px-4 py-2 border border-teal-700">Score (out of 10)</th>
          <th class="px-4 py-2 border border-teal-700">Comments</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(review, idx) in reviews"
          :key="review.employeeId + review.reviewPeriod"
          class="even:bg-gray-100 dark:even:bg-gray-800"
        >
          <td class="border border-gray-300 dark:border-gray-700 px-3 py-2">{{ review.employeeId }}</td>
          <td class="border border-gray-300 dark:border-gray-700 px-3 py-2">{{ review.employeeName }}</td>
          <td class="border border-gray-300 dark:border-gray-700 px-3 py-2">
            <input
              type="text"
              v-model="review.reviewPeriod"
              @change="$emit('period-change', idx, review.reviewPeriod)"
              class="w-24 px-2 py-1 border rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </td>
          <td class="border border-gray-300 dark:border-gray-700 px-3 py-2">{{ review.reviewer }}</td>
          <td class="border border-gray-300 dark:border-gray-700 px-3 py-2">
            <select
              v-model.number="review.score"
              @change="$emit('score-change', idx, review.score)"
              class="px-2 py-1 border rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              <option v-for="n in 11" :key="n-1" :value="n-1">{{ n-1 }}</option>
            </select>
          </td>
          <td class="border border-gray-300 dark:border-gray-700 px-3 py-2">
            <textarea
              v-model="review.comments"
              @change="$emit('comments-change', idx, review.comments)"
              rows="2"
              class="w-full px-2 py-1 border rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"
            ></textarea>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "PerformanceReviewTable",
  props: {
    reviews: {
      type: Array,
      required: true
    }
  }
};
</script>
  