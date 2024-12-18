<template>
  <SheetPerformanceView
    v-for="sheet in splitSheets"
    :key="sheet.slug"
    :label="sheet.label"
    :sheets="sheet.sheets"
  />
</template>
<script>
import SheetPerformanceView from './SheetPerformanceView.vue'
import getSplitSheets from '../utils/getSplitSheets'

export default {
  name: 'SheetPerformance',
  data() {
    return {
      splitSheets: {
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
    SheetPerformanceView,
  },
  methods: {
    getSplitSheets: getSplitSheets,
  },
  created() {
    this.splitSheets = getSplitSheets(this.sheets)
  },
}
</script>
