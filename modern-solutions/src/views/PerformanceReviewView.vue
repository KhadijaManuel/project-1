<template>Add commentMore actions
  <div class="page">
    <h2 class="page-title">Performance Reviews</h2>
    <PerformanceReviewTable :reviews="reviews" @score-change="updateScore" @comments-change="updateComments" @period-change="updatePeriod" />
  </div>
</template>

<script>
import PerformanceReviewTable from '@/components/PerformanceReviewTable.vue'

export default {
  components: { PerformanceReviewTable },
  data() {
    return {
      // List of performance reviews
      reviews: []
    }
  },
  async mounted() {
    // Fetches the performance reviews when the component is mounted
    const response = await fetch('/data/performance.json')
    const data = await response.json()
    this.reviews = data.performanceReviews
  },
  methods: {
    // Methods to handle updates to the reviews
    // These methods will be called when the user changes the score, comments or review period
    updateScore(idx, newScore) {
      this.reviews[idx].score = newScore
      alert(
        `Score for ${this.reviews[idx].employeeName} updated to ${newScore}`
      )
    },
    updateComments(idx, newComments) {
      this.reviews[idx].comments = newComments
      alert(
        `Comments for ${this.reviews[idx].employeeName} updated to ${newComments}`
      )
    },
    updatePeriod(idx, newPeriod) {
      this.reviews[idx].reviewPeriod = newPeriod
      alert(
        `Review period for ${this.reviews[idx].employeeName} updated to ${newPeriod}`
      )
    }
  }
}
</script>

<style scoped>
.page {
  padding: 0rem;
}
.page-title {
  margin-bottom: 1rem;
}
</style>