<template>
  <div v-if="sheet">
    <SheetDetails :sheet="sheet" />
  </div>
  <div v-else>
    <PageNotFound />
  </div>
</template>

<script>
import { sheets } from '@/temp-data'
import PageNotFound from './PageNotFound.vue'
import SheetDetails from '@/components/SheetDetails.vue'

export default {
  name: 'SheetPage',
  data() {
    return {
      sheet: sheets.find(sheet => sheet.id === this.$route.params.sheetId),
    }
  },
  components: {
    PageNotFound,
    SheetDetails,
  },
}
</script>
