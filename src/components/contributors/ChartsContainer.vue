<template>
  <div class="charts-container">
    <LineChart :data="chartData" />
  </div>
</template>
<script>
export default {
  name: 'ChartsContainer',
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
  props: ['bets'],
  computed: {
    l7() {
      return true
    },
    mtd() {
      return true
    },
    ytd() {
      return true
    },
  },
}
</script>
