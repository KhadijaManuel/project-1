 <template>
  <div class="performance-dashboard">
    <h1>2024 Q4 Employee Performance</h1>
    <div class="cards-grid">
      <FlipCard 
        v-for="employee in employees" 
        :key="employee.employeeId"
        :employee="employee"
      />
    </div>
  </div>
</template>

<script>
import FlipCard from './components/FlipCard.vue'

export default {
  components: { FlipCard },
  data() {
    return {
      employees: [
        {
  performanceReviews: [
    {
      employeeId: 1,
      employeeName: "Sibongile Nkosi",
      reviewPeriod: "2024 Q4",
      reviewer: "Lungile Moyo",
      score: 9,
      comments: "Consistently delivers high-quality work and shows leadership potential."
    },
    {
      employeeId: 2,
      employeeName: "Lungile Moyo",
      reviewPeriod: "2024 Q4",
      reviewer: "Thabo Molefe",
      score: 8,
      comments: "Excellent management skills and team support."
    },
    {
      employeeId: 3,
      employeeName: "Thabo Molefe",
      reviewPeriod: "2024 Q4",
      reviewer: "Sibongile Nkosi",
      score: 8,
      comments: "Pays attention to detail and meets deadlines."
    },
    {
      employeeId: 4,
      employeeName: "Keshav Naidoo",
      reviewPeriod: "2024 Q4",
      reviewer: "Zanele Khumalo",
      score: 7,
      comments: "Good sales performance, can improve on follow-ups."
    },
    {
      employeeId: 5,
      employeeName: "Zanele Khumalo",
      reviewPeriod: "2024 Q4",
      reviewer: "Keshav Naidoo",
      score: 8,
      comments: "Creative marketing ideas and strong teamwork."
    },
    {
      employeeId: 6,
      employeeName: "Sipho Zulu",
      reviewPeriod: "2024 Q4",
      reviewer: "Naledi Moeketsi",
      score: 7,
      comments: "Strong design skills and attention to user experience."
    },
    {
      employeeId: 7,
      employeeName: "Naledi Moeketsi",
      reviewPeriod: "2024 Q4",
      reviewer: "Sipho Zulu",
      score: 8,
      comments: "Excellent at automating processes and ensuring system reliability."
    },
    {
      employeeId: 8,
      employeeName: "Farai Gumbo",
      reviewPeriod: "2024 Q4",
      reviewer: "Zanele Khumalo",
      score: 7,
      comments: "Creative content ideas and good collaboration with marketing."
    },
    {
      employeeId: 9,
      employeeName: "Karabo Dlamini",
      reviewPeriod: "2024 Q4",
      reviewer: "Fatima Patel",
      score: 8,
      comments: "Accurate financial reporting and strong analytical skills."
    },
    {
      employeeId: 10,
      employeeName: "Fatima Patel",
      reviewPeriod: "2024 Q4",
      reviewer: "Karabo Dlamini",
      score: 9,
      comments: "Excellent customer support leadership and problem-solving."
    }
  ]
}
      ]
    }
  }
}
</script>

<style scoped>
.performance-dashboard {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  padding: 20px;
}
</style> 

