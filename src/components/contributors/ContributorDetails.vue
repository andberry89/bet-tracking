<template>
  <div
    v-if="contributor.sports"
    class="page-header"
  >
    <div class="left-side">
      <div class="logo-wrap">
        <div class="logo-image">
          <img
            :src="contributor.imageUrl"
            height="85"
            width="85"
          />
        </div>
        <div class="item-name">{{ contributor.name }}</div>
        <div class="contributor-sports">{{ contributor.sports.join(', ') }}</div>
      </div>
      <div class="numbers">
        <PerformanceTable :bets="bets" />
      </div>
      <div class="chart">
        <Bar :data="chartData" />
      </div>
    </div>
  </div>
</template>
<script>
import dateFormat from 'dateformat'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import PerformanceTable from './components/PerformanceTable.vue'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'ContributorDetails',
  data() {
    return {
      chartData: {
        labels: ['January', 'February', 'March'],
        datasets: [
          {
            label: 'Year to Date',
            backgroundColor: '#f87979',
            data: [40, -20, 12],
          },
        ],
      },
    }
  },
  props: {
    bets: {
      type: Array,
      required: true,
    },
    contributor: {
      type: Object,
    },
  },
  components: {
    Bar,
    PerformanceTable,
  },
  /**
   * TODO: ADD DATE TO FILTER RESULTS
   * TODO: CREATE A BAR GRAPH
   * *
   */
  methods: {
    dateFormat: dateFormat,
  },
}
</script>
<style scoped>
.page-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
}
.contributor-sports {
  font: 400 16px/1.2 'Helvetica', 'Arial', sans-serif;
  color: #333;
}
.left-side {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.left-side .numbers {
  margin-left: 15px;
  padding-left: 15px;
  border-left: 1px solid var(--white);
}
.logo-wrap {
  text-align: center;
}
.logo-wrap img {
  border-radius: 50%;
}
</style>
