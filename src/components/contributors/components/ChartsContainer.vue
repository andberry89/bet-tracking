<template>
  <div class="charts-container">
    <!-- <LineChart
      :data="l7.data"
      :options="l7.options"
    /> -->
    <LineChart
      :data="l30.data"
      :options="l30.options"
    />
    <!-- <LineChart
      :data="ytd.data"
      :options="ytd.options"
    /> -->
  </div>
</template>
<script>
import createDataset from '@/utils/createDataset'
import dateFormat from 'dateformat'
import getDates from '@/utils/getDates'
import { chartData, chartOptions } from './ChartsContainer'

//TODO: MAKE THE OPTIONS DEFAULT SO THEY DON'T HAVE TO GET PASSED IN ON EVERY CHART
// Can we get the chart tooltip to show the difference from the day before? Is that the daily total?
// NEED TO FIGURE OUT ROUND ROBINS
// NEED A VOID OPTION
// NEED A LIST OF PLAYERS WITH TEAMS AS AN IMPORTED SET

export default {
  name: 'ChartsContainer',
  props: ['bets'],
  computed: {
    dates() {
      return getDates()
    },
    l7() {
      const { dates, runningTotal } = createDataset([this.dates.lastWeek, this.dates.today], this.bets)
      const data = chartData(dates, runningTotal)
      const options = chartOptions('Last 7 Days')

      return { data, options }
    },
    l30() {
      const { dates, runningTotal } = createDataset([this.dates.lastMonth, this.dates.today], this.bets)
      const data = chartData(dates, runningTotal)
      const options = chartOptions('Last 30 Days')

      return { data, options }
    },
    ytd() {
      const { dates, runningTotal } = createDataset([this.dates.firstOfTheYear, this.dates.today], this.bets)
      const data = chartData(dates, runningTotal)
      const options = chartOptions('Year to Date')

      return { data, options }
    },
  },
  methods: {
    chartData: chartData,
    chartOptions: chartOptions,
    createDataset: createDataset,
    dateFormat: dateFormat,
    getDates: getDates,
  },
}
</script>
<style scoped></style>
./ChartsContainer
