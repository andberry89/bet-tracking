<template>
  <div class="performance-head">
    <h3>{{ this.label }}</h3>
    <div
      class="chart-wrap"
      v-if="dataReady"
    >
      <PropPerformance
        v-for="prop in sortedSheets"
        :prop="prop"
        :key="prop.name + '-card'"
      />
      <PropPerformance
        class="grand-total-prop"
        :prop="this.grandTotal"
      />
    </div>
    <div
      v-else
      class="no-info"
    >
      <span>No Information Available</span>
    </div>
  </div>
</template>
<script>
import PropPerformance from './PropPerformance.vue'
import calcSheetPerformance from '../utils/calcSheetPerformance'
import { getMostSuccessfulPlayers, getMostUsedPlayers } from '../utils/calcPlayers'
import propNames from '@/utils/sheets/propNames'

export default {
  name: 'SheetPerformanceView',
  data() {
    return {
      dataReady: false,
      grandTotal: {
        type: Object,
      },
      perfectSheets: 0,
      players: [],
      actualProps: [],
      sortedSheets: {
        type: Object,
      },
    }
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    sheets: {
      type: Array,
      required: true,
    },
  },
  components: {
    PropPerformance,
  },
  computed: {
    showPerfect() {
      return this.sheets[0].sheet === '660db1bcf994906905e1ce76' ? true : false
    },
  },
  methods: {
    calcSheetPerformance: calcSheetPerformance,
    getMostSuccessfulPlayers: getMostSuccessfulPlayers,
    getMostUsedPlayers: getMostUsedPlayers,
    propNames: propNames,
    calcHitRate(hit, total) {
      if (total === 0) {
        return 0
      }
      return ((hit * 100) / total).toFixed(2)
    },
  },
  created() {
    if (this.sheets.length > 0) {
      const results = calcSheetPerformance(this.sheets)
      this.perfectSheets = results.perfectSheets
      this.players = results.players
      this.sortedSheets = results.sortedSheets
      this.grandTotal = results.grandTotal
      this.actualProps = this.propNames(this.sheets[0].sheet)
      this.dataReady = true
    }
  },
}
</script>
<style scoped>
.performance-head {
  width: 50%;
  margin: 0 auto;
  text-align: center;
  padding: 15px;
}
h3 {
  margin: 0 0 10px 0;
  display: inline-block;
  color: var(--orange);
}
.chart-wrap {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  gap: 15px;
}
</style>
