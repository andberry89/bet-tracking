<template>
  <Line
    id="my-chart-id"
    :options="chartOptions"
    :data="data"
  />
</template>
<script>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

export default {
  name: 'LineChart',
  components: {
    Line,
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
      },
    }
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
}
</script>
