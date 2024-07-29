<template>
  <LineChart
    :options="options"
    :data="data"
  />
</template>
<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, registerables } from 'chart.js'

ChartJS.register(...registerables)

export default {
  name: 'LineChart',
  components: {
    LineChart: Line,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
