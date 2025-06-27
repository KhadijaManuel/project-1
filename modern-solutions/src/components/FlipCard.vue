<template>
  <div v-if="employee" class="flip-container" @click="isFlipped = !isFlipped">
    <div class="flipper" :class="{ flipped: isFlipped }">
      <!-- Front Side -->
      <div class="front">
        <div class="avatar">{{ getInitials(employee.employeeName) }}</div>
        <h3>{{ employee.employeeName }}</h3>
        <div class="score-display">
          <span class="score">{{ employee.score }}</span>
          <span class="max-score">/10</span>
        </div>
        <p class="department">{{ getDepartment(employee.employeeId) }}</p>
        <p class="click-hint">Click to view details</p>
      </div>

      <!-- Back Side -->
      <div class="back">
        <h4>Performance Review</h4>
        <PerformanceChart :score="employee.score" />
        <div class="review-content">
          <p class="review-text">"{{ employee.comments }}"</p>
          <p class="reviewer">- {{ employee.reviewer }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PerformanceChart from './PerformanceChart.vue'

export default {
  components: { PerformanceChart },
  props: {
    employee: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isFlipped: false
    }
  },
  methods: {
    getInitials(name) {
      return name.split(' ').map(n => n[0]).join('')
    },
    getDepartment(id) {
      const departments = ['Management', 'Sales', 'IT', 'Marketing', 'Finance', 'Design', 'Operations']
      return departments[id % departments.length]
    }
  }
}
</script>

<style scoped>
.flip-container {
  perspective: 1000px;
  height: 400px;
  cursor: pointer;
}

.flipper {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.front, .back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.front {
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.back {
  background: white;
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
}

.flipped {
  transform: rotateY(180deg);
}

.avatar {
  width: 80px;
  height: 80px;
  background: rgba(255,255,255,0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.score-display {
  font-size: 2rem;
  margin: 15px 0;
}

.score {
  font-size: 2.5rem;
  font-weight: bold;
  color: #f6ff00;
}

.department {
  background: rgba(255,255,255,0.2);
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
}

.click-hint {
  margin-top: 20px;
  font-size: 0.9rem;
  opacity: 0.8;
}

.review-content {
  margin-top: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  flex-grow: 1;
}

.review-text {
  font-style: italic;
  margin-bottom: 10px;
}

.reviewer {
  text-align: right;
  color: #666;
}
</style>


