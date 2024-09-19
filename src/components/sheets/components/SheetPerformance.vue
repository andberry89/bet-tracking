<template>
  <div
    v-for="sheet in sheets"
    :key="sheet._id"
  >
    {{ calcSheetPerformance(sheets) }}
  </div>
</template>
<script>
import calcSheetPerformance from '../utils/calcSheetPerformance'
export default {
  name: 'SheetPerformance',
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
}
</script>
