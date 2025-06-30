<template>
  <div class="table-wrapper">
    <table class="review-table">
      <thead>
        <tr>
          <th>Employee ID</th>
          <th>Employee Name</th>
          <th>Review Period</th>
          <th>Reviewer</th>
          <th>Score (out of 10)</th>
          <th>Comments</th>
        </tr>
      </thead>
      <tbody>
        <!-- Looping through each review -->
        <tr v-for="(review, idx) in reviews" :key="review.employeeId + review.reviewPeriod">
          <td>{{ review.employeeId }}</td>
          <td>{{ review.employeeName }}</td>
          <td>
            <!-- Input to change review period -->
            <input
              type="text"
              v-model="review.reviewPeriod"
              @change="$emit('period-change', idx, review.reviewPeriod)"
              style="width: 20%;"
            />
          </td>
          <td>{{ review.reviewer }}</td>
          <td>
            <!-- Dropdown to change score -->
            <select v-model="review.score" @change="$emit('score-change', idx, review.score)">
              <option v-for="n in 11" :key="n-1" :value="n-1">{{ n-1 }}</option>
            </select>
          </td>
          <td>
            <!-- Textarea to edit comments -->
            <textarea
              v-model="review.comments"
              @change="$emit('comments-change', idx, review.comments)"
              style="width: 95%;"
            ></textarea>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    reviews: Array
  }
}
</script>

<style scoped>
.table-wrapper {
  overflow-x: auto;
}
.review-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
  font-family: Arial, sans-serif;
  margin-top: 1rem;
}
.review-table th,
.review-table td {
  border: 1px solid white;
  padding: 4px;
  text-align: left;

}
.review-table th {
  background: lightseagreen;
  color: white;
}
</style>