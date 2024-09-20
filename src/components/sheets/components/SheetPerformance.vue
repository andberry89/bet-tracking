<template>
  <div>
    {{ sortedSheets }}
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
