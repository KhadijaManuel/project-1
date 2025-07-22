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
          <h3 class="text-lg font-semibold mb-2">{{ review.employeeName }}</h3>
          <p class="text-sm">Reviewer: {{ review.reviewer }}</p>
          <p class="text-sm mt-1">Review Period: {{ review.reviewPeriod }}</p>
        </div>

        <!-- Back Side -->
        <div
          class="absolute inset-0 bg-gray-700 text-white flex flex-col justify-center items-center p-4 rounded-lg rotate-y-180 backface-hidden"
        >
          <p class="text-sm mb-2">Score: <span class="font-bold">{{ review.score }}/10</span></p>
          <p class="text-sm text-center whitespace-pre-wrap">{{ review.comments }}</p>
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
