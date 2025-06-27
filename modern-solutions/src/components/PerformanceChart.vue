<template>
  <div class="chart-wrapper">
    <line-chart
      :chart-data="chartData"
      :options="chartOptions"
      :height="150"
    />
  </div>
</template>

<script>
import { Line } from 'vue-chartjs'
import { 
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
)

export default {
  components: { LineChart: Line },
  props: {
    score: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 10,
            ticks: {
              stepSize: 1
            }
          },
          x: {
            display: false
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context) => `Score: ${context.raw}`
            }
          }
        }
      }
    }
  },
  computed: {
    chartData() {
      return {
        labels: ['Q4 Performance'],
        datasets: [{
          data: [this.score],
          backgroundColor: 'rgba(78, 115, 223, 0.2)',
          borderColor: '#4e73df',
          pointBackgroundColor: '#4e73df',
          pointBorderColor: '#fff',
          pointRadius: 6,
          tension: 0.1
        }]
      }
    }
  }
}
</script>

<style scoped>
.chart-wrapper {
  height: 150px;
  margin: 10px 0;
}
</style> 

