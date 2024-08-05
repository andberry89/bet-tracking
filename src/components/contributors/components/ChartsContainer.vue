<template>
  <div class="charts-container">
    <!-- <LineChart
      :data="l7.data"
      :options="l7.options"
    /> -->
    <!-- <LineChart
      :data="l30.data"
      :options="l30.options"
    /> -->
    <!-- <LineChart
      :data="ytd.data"
      :options="ytd.options"
    /> -->
    <!-- <LineChart :data="dataCollection" /> -->
  </div>
</template>
<script>
import createDataset from '@/utils/createDataset'
import dateFormat from 'dateformat'
import getDates from '@/utils/getDates'
import { chartData, chartOptions } from './ChartsContainer'

/**
 * TODO
 * Can we get the chart tooltip to show the difference from the day before? Is that the daily total?
 * NEED TO FIGURE OUT ROUND ROBINS
 * NEED A LIST OF PLAYERS WITH TEAMS AS AN IMPORTED SET
 * NEED TO FIGURE OUT SVG ICONS
 * MULTIPLE CHARTS ON THE SAME PAGE -- async created hook?
 */

export default {
  name: 'ChartsContainer',
  data() {
    return {
      l7: {
        data: {
          type: Object,
        },
        options: {
          type: Object,
        },
      },
      l30: {
        data: {
          type: Object,
        },
        options: {
          type: Object,
        },
      },
      ytd: {
        data: {
          type: Object,
        },
        options: {
          type: Object,
        },
      },
      dataCollection: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 39, 10, 40, 39, 80, 40],
          },
        ],
      },
    }
  },
  props: ['bets'],
  methods: {
    chartData: chartData,
    chartOptions: chartOptions,
    createDataset: createDataset,
    dateFormat: dateFormat,
    getDates: getDates,
  },
  created() {
    const dates = getDates()
    const l7Data = createDataset([dates.lastWeek, dates.yesterday], this.bets)
    const l30Data = createDataset([dates.lastMonth, dates.yesterday], this.bets)
    const ytdData = createDataset([dates.firstOfTheYear, dates.yesterday], this.bets)

    this.l7.data = chartData(l7Data.dates, l7Data.runningTotal)
    this.l7.options = chartOptions('Last 7 Days')

    this.l30.data = chartData(l30Data.dates, l30Data.runningTotal)
    this.l30.options = chartOptions('Last 30 Days')

    this.ytd.data = chartData(ytdData.dates, ytdData.runningTotal)
    this.ytd.options = chartOptions('Year to Date')
  },
}
</script>
<style scoped></style>
