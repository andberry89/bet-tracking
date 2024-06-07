<template>
  <div class="charts-container">
    <LineChart
      :data="l30.data"
      :options="l30.options"
    />
  </div>
</template>
<script>
import createDataset from '@/utils/createDataset'
import dateFormat from 'dateformat'
import { chartData, chartOptions } from './ChartsContainer'

export default {
  name: 'ChartsContainer',
  props: ['bets'],
  computed: {
    l7() {
      return true
    },
    l30() {
      const today = dateFormat(new Date(), 'isoDate')
      let lastMonth = new Date()
      lastMonth = dateFormat(lastMonth.setDate(lastMonth.getDate() - 30), 'isoDate')
      const { dates, runningTotal } = createDataset([lastMonth, today], this.bets)
      const data = chartData(dates, runningTotal)
      const options = chartOptions('Last 30 Days')

      return { data, options }
    },
    ytd() {
      return true
    },
  },
  methods: {
    chartData: chartData,
    chartOptions: chartOptions,
    createDataset: createDataset,
    dateFormat: dateFormat,
  },
}
</script>
<style scoped></style>
./ChartsContainer
