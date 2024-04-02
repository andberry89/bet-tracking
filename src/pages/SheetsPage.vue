<template>
  <h1>Sheets Review</h1>
  <SheetsList :sheets="sheets" />
</template>

<script>
import SheetsList from '@/components/SheetsList.vue'
import { sheets } from '@/temp-data.js'
export default {
  name: 'SheetsPage',
  data() {
    return {
      sheets,
    }
  },
  components: {
    SheetsList,
  },
}
</script>
