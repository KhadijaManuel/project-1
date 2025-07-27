<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <div
      v-for="(review, idx) in reviews"
      :key="review.employeeId + '-' + idx"
      class="group perspective w-full"
    >
      <div
        class="relative w-full h-52 transform transition-transform duration-500 group-hover:rotate-y-180 preserve-3d rounded-lg shadow-lg"
      >
        <!-- Front Side -->
        <div
          class="absolute inset-0 bg-blue-600 text-white flex flex-col justify-center items-center p-4 rounded-lg backface-hidden"
        >
          <div class="w-16 h-16 mb-2 rounded-full overflow-hidden border-2 border-white shadow-md">
            <img
              v-if="review.profilePic"
              :src="review.profilePic"
              alt="Profile Picture"
              class="w-full h-full object-cover"
            />
            <div
              v-else
              class="w-full h-full flex items-center justify-center bg-blue-800 text-xl font-bold"
            >
              👤
            </div>
          </div>
          <h3 class="text-lg font-semibold mb-1">{{ review.employeeName }}</h3>
          <p class="text-sm">Reviewer: {{ review.reviewer || 'N/A' }}</p>
          <p class="text-sm mt-1">Review Period: {{ review.reviewPeriod || 'N/A' }}</p>
        </div>

        <!-- Back Side -->
        <div
          class="absolute inset-0 bg-gray-700 text-white flex flex-col justify-between p-4 rounded-lg rotate-y-180 backface-hidden"
        >
          <div>
            <p class="text-sm mb-2">
              Score: <span class="font-bold">{{ review.score || 0 }}/10</span>
            </p>
            <p class="text-sm whitespace-pre-wrap">{{ review.comments || 'No comments' }}</p>
          </div>
          <div class="flex gap-3 mt-3 justify-center">
            <button
              @click="$emit('edit-review', review)"
              class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
              type="button"
            >
              Edit
            </button>
            <button
              @click="$emit('delete-review', review.employeeId)"
              class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              type="button"
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
  perspective: 1000px;
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
.group-hover\:rotate-y-180:hover {
  transform: rotateY(180deg);
}
</style>
