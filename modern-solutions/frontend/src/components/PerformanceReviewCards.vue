<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <div
      v-for="(review, idx) in reviews"
      :key="review.employeeId + '-' + idx"
      class="group perspective"
    >
      <div
        class="relative w-full h-64 transition-transform duration-700 transform-style preserve-3d rounded-2xl shadow-lg group-hover:rotate-y-180"
      >
        <!-- Front Side -->
        <div
          class="absolute inset-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center rounded-2xl backface-hidden flex flex-col items-center justify-center p-5"
        >
          <div class="w-20 h-20 mb-3 rounded-full overflow-hidden border-2 border-blue-500 shadow-md">
            <img
              v-if="review.profilePic"
              :src="review.profilePic"
              alt="Profile"
              class="w-full h-full object-cover"
            />
            <div
              v-else
              class="w-full h-full flex items-center justify-center bg-blue-500 text-white text-xl font-bold"
            >
              {{ review.employeeName?.[0] || '?' }}
            </div>
          </div>
          <h3 class="text-base font-semibold text-gray-800 dark:text-white">{{ review.employeeName }}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-300">Reviewer: {{ review.reviewer || 'N/A' }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-300 mt-1">Period: {{ review.reviewPeriod || 'N/A' }}</p>
        </div>

        <!-- Back Side -->
        <div
          class="absolute inset-0 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-2xl rotate-y-180 backface-hidden flex flex-col justify-between p-5"
        >
          <div>
            <p class="text-sm mb-2">
              <span class="font-semibold">Score:</span> {{ review.score || 0 }}/10
            </p>
            <p class="text-sm whitespace-pre-wrap italic">
              "{{ review.comments || 'No comments' }}"
            </p>
          </div>
          <div class="flex gap-3 mt-4 justify-center">
            <button
              @click="$emit('edit-review', review)"
              class="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded-md"
            >
              Edit
            </button>
            <button
              @click="$emit('delete-review', review.employeeId)"
              class="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PerformanceReviewCards",
  props: {
    reviews: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.perspective {
  perspective: 1200px;
}
.preserve-3d {
  transform-style: preserve-3d;
}
.backface-hidden {
  backface-visibility: hidden;
}
.rotate-y-180 {
  transform: rotateY(180deg);
}
.group:hover .group-hover\:rotate-y-180 {
  transform: rotateY(180deg);
}
</style>
