<template>
  <div class="charts-container">
    <LineChart :data="mtd" />
  </div>
</template>
<script>
import createDataset from '@/utils/createDataset'

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
      const { dates, runningTotal } = createDataset(['2024/04/01', '2024/04/30'], this.bets)
      const data = {
        labels: dates,
        datasets: [
          {
            label: 'April 2024',
            backgroundColor: '#15c63c',
            data: runningTotal,
          },
        ],
      }
      return data
    },
    ytd() {
      return true
    },
  },
  methods: {
    createDataset: createDataset,
  },
}
</script>
