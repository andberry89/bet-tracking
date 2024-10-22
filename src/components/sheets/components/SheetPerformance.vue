<template>
  <div
    v-if="dataReady"
    class="performance-head"
  >
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th
              scope="col"
              v-for="prop in sortedSheets"
              :key="prop.name"
            >
              {{ prop.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Hit</th>
            <td
              v-for="prop in sortedSheets"
              :key="prop.name + ' Hit'"
            >
              {{ prop.hit }}
            </td>
          </tr>
          <tr>
            <th scope="row">Total</th>
            <td
              v-for="prop in sortedSheets"
              :key="prop.name + ' Total'"
            >
              {{ prop.total }}
            </td>
          </tr>
          <tr>
            <th scope="row">Hit Rate</th>
            <td
              v-for="prop in sortedSheets"
              :key="prop.name + ' Hit Rate'"
            >
              {{ ((prop.hit * 100) / prop.total).toFixed(2) + '%' }}
            </td>
          </tr>
          <tr v-if="showPerfect">
            <th scope="row">Perfect Weeks</th>
            <td
              v-for="prop in sortedSheets"
              :key="prop.name + ' Perfect'"
            >
              {{ prop.perfect }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="players-wrap">
      <PlayerPerformanceTable
        title="Favorite Players"
        :players="mostUsedPlayers(this.players)"
      />
      <PlayerPerformanceTable
        title="MVPs"
        :players="mostSuccessfulPlayers(this.players)"
      />
    </div>
  </div>
</template>
<script>
import PlayerPerformanceTable from './PlayerPerformanceTable.vue'
import calcSheetPerformance from '../utils/calcSheetPerformance'
import { mostUsedPlayers, mostSuccessfulPlayers } from '../utils/calcPlayers'
export default {
  name: 'SheetPerformance',
  data() {
    return {
      dataReady: false,
      perfectSheets: 0,
      players: [],
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
    PlayerPerformanceTable,
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
  },
  created() {
    const results = calcSheetPerformance(this.sheets)
    this.perfectSheets = results.perfectSheets
    this.players = results.players
    this.sortedSheets = results.sortedSheets
    this.dataReady = true
  },
}
</script>
<style scoped>
.performance-head {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
}
.players-wrap {
  display: flex;
  flex-flow: row nowrap;
  gap: 30px;
  text-align: center;
}
table {
  text-align: center;
  border-collapse: collapse;
}
th,
td {
  padding: 0 5px;
}
table tr {
  border-bottom: 1px solid var(--light-gray);
}
thead tr {
  background-color: var(--translucent-green);
}
tbody th {
  text-align: right;
}
</style>
