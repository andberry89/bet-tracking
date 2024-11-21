<template>
  <Doughnut
    id="my-chart-id"
    :data="data"
    :options="options"
  />
</template>
<script>
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, DoughnutController, ArcElement } from 'chart.js'

ChartJS.register(DoughnutController, ArcElement)

export default {
  name: 'DoughnutChart',
  components: { Doughnut },
  data() {
    return {
      options: {
        borderWidth: 0,
        cutout: '60%',
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
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
