<template>
  <div
    v-if="dataReady"
    class="performance-head"
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
    <!-- <div class="players-wrap">
      <PlayerPerformanceTable
        title="Favorite Players"
        :players="mostUsedPlayers(this.players)"
      />
      <PlayerPerformanceTable
        title="MVPs"
        :players="mostSuccessfulPlayers(this.players)"
      />
    </div> -->
  </div>
</template>
<script>
// import PlayerPerformanceTable from './PlayerPerformanceTable.vue'
import PropPerformance from './PropPerformance.vue'
import calcSheetPerformance from '../utils/calcSheetPerformance'
import { mostUsedPlayers, mostSuccessfulPlayers } from '../utils/calcPlayers'
import propNames from '@/utils/sheets/propNames'

export default {
  name: 'SheetPerformance',
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
    sheets: {
      type: Array,
      required: true,
      default: () => null,
    },
  },
  components: {
    // PlayerPerformanceTable,
    PropPerformance,
  },
  computed: {
    showPerfect() {
      return this.sheets[0].sheet === '660db1bcf994906905e1ce76' ? true : false
    },
  },
  methods: {
    calcSheetPerformance: calcSheetPerformance,
    mostSuccessfulPlayers: mostSuccessfulPlayers,
    mostUsedPlayers: mostUsedPlayers,
    propNames: propNames,
    calcHitRate(hit, total) {
      if (total === 0) {
        return 0
      }
      return ((hit * 100) / total).toFixed(2)
    },
  },
  created() {
    const results = calcSheetPerformance(this.sheets)
    this.perfectSheets = results.perfectSheets
    this.players = results.players
    this.sortedSheets = results.sortedSheets
    this.grandTotal = results.grandTotal
    this.actualProps = this.propNames(this.sheets[0].sheet)
    this.dataReady = true
  },
}
</script>
<style scoped>
.performance-head {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  gap: 15px;
}
.players-wrap {
  display: flex;
  flex-flow: row nowrap;
  gap: 30px;
  text-align: center;
}
</style>
