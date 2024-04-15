<template>
  <div v-if="sheet">
    <SheetDetails :sheet="sheet" />
  </div>
  <div v-else>
    <PageNotFound />
  </div>
</template>

<script>
import PageNotFound from './PageNotFound.vue'
import SheetDetails from '@/components/SheetDetails.vue'
import axios from 'axios'

export default {
  name: 'SheetPage',
  data() {
    return {
      sheet: {},
    }
  },
  async created() {
    const response = await axios.get(`/api/sheets/${this.$route.params.sheetId}`)
    const data = response.data
    this.sheet = data
  },
  components: {
    PageNotFound,
    SheetDetails,
  },
}
</script>
