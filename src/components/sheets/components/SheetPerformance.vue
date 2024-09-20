<template>
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
            {{ (prop.hit * 100) / prop.total + '%' }}
          </td>
        </tr>
        <tr>
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
</template>
<script>
import calcSheetPerformance from '../utils/calcSheetPerformance'
export default {
  name: 'SheetPerformance',
  data() {
    return {
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
  methods: {
    calcSheetPerformance: calcSheetPerformance,
  },
  created() {
    const results = calcSheetPerformance(this.sheets)
    this.perfectSheets = results.perfectSheets
    this.players = results.players
    this.sortedSheets = results.sortedSheets
  },
}
</script>
<style scoped>
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
tbody th {
  text-align: right;
}
</style>
