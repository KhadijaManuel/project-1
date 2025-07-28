<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-8">
    <h2 class="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400">
      Performance Reviews
    </h2>

    <form @submit.prevent="handleSubmit" class="bg-white dark:bg-gray-800 shadow p-4 rounded-xl mb-6 grid gap-4">
      <h3 class="text-xl font-semibold mb-2">
        {{ editingReview ? 'Update Review' : 'Add Review' }}
      </h3>

      <select v-model="form.employee_id" class="border p-2 rounded" required>
        <option disabled value="">Please select an employee</option>
        <option v-for="employee in employees" :key="employee.id" :value="employee.id">
          {{ employee.first_name }} {{ employee.last_name }}
        </option>
      </select>

      <input v-model="form.review_period" type="text" placeholder="Review period" class="border p-2 rounded" required />
      <input v-model="form.reviewer" type="text" placeholder="Reviewer" class="border p-2 rounded" required />
      <input v-model.number="form.score" type="number" min="0" max="10" placeholder="Score" class="border p-2 rounded" required />
      <textarea v-model="form.comments" placeholder="Comments" class="border p-2 rounded"></textarea>

      <div class="flex gap-4">
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {{ editingReview ? 'Update' : 'Add' }}
        </button>
        <button v-if="editingReview" type="button" @click="cancelEdit" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
          Cancel
        </button>
      </div>
    </form>

    <PerformanceReviewCards
      :reviews="reviews"
      @delete-review="deleteReview"
      @edit-review="startEdit"
    />
  </div>
</template>

<script>
import PerformanceReviewCards from "@/components/PerformanceReviewCards.vue";

export default {
  components: { PerformanceReviewCards },
  data() {
    return {
      reviews: [],
      employees: [], 
      form: {
        employee_id: "", 
        review_period: "",
        reviewer: "",
        score: 0,
        comments: "",
      },
      editingReview: null,
    };
  },
  methods: {
    async fetchReviews() {
      try {
        const response = await fetch("http://localhost:5000/reviews", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        const data = await response.json();
        this.reviews = data.map((r) => ({
          id: r.review_id,
          employeeId: r.employee_id, 
          employeeName: `${r.first_name} ${r.last_name}`, 
          reviewPeriod: r.review_period,
          reviewer: r.reviewer,
          score: r.score,
          comments: r.comments,
        }));
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    },
    async fetchEmployees() {
      try {
        const response = await fetch("http://localhost:5000/employees", { 
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        const data = await response.json();
        this.employees = data.map((e) => ({
          id: e.employee_id, 
          first_name: e.first_name,
          last_name: e.last_name,
        }));
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    },
    async handleSubmit() {
      try {
        const body = {
          employee_id: this.form.employee_id, 
          review_period: this.form.review_period,
          reviewer: this.form.reviewer,
          score: this.form.score,
          comments: this.form.comments,
        };

        if (this.editingReview) {
          await fetch(`http://localhost:5000/reviews/${this.editingReview.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("authToken")}`
            },
            body: JSON.stringify(body),
          });
        } else {
          await fetch("http://localhost:5000/reviews", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("authToken")}`
            },
            body: JSON.stringify(body),
          });
        }
        this.resetForm();
        await this.fetchReviews();
      } catch (err) {
        console.error("Error saving review:", err);
      }
    },
    startEdit(review) {
      this.editingReview = review;
      
      this.form = {
        employee_id: review.employeeId, 
        review_period: review.reviewPeriod,
        reviewer: review.reviewer,
        score: review.score,
        comments: review.comments,
      };
    },
    cancelEdit() {
      this.resetForm();
    },
    resetForm() {
      this.form = {
        employee_id: "", 
        review_period: "",
        reviewer: "",
        score: 0,
        comments: "",
      };
      this.editingReview = null;
    },
    async deleteReview(reviewId) {
      if (!confirm("Delete this review?")) return;
      try {
        await fetch(`http://localhost:5000/reviews/${reviewId}`, {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${localStorage.getItem("authToken")}` },
        });
        await this.fetchReviews();
      } catch (err) {
        console.error("Error deleting review:", err);
      }
    },
  },
  mounted() {
    this.fetchReviews();
    this.fetchEmployees(); 
  },
};
</script>