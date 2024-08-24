<template>
  <div v-if="sheet">
    <SheetDetails
      :sheet="sheet"
      :sheetId="sheetId"
      :sheetItems="sheetItems"
    />
  </div>
  <div v-else>
    <PageNotFound />
  </div>
</template>

<script>
import PageNotFound from './PageNotFound.vue'
import SheetDetails from '@/components/sheets/SheetDetails.vue'
import axios from 'axios'

export default {
  name: 'SheetPage',
  data() {
    return {
      sheet: {},
      sheetId: '',
      sheetItems: [],
    }
  },
  async created() {
    const sheetId = this.$route.params.sheetId
    this.sheetId = sheetId

    const sheetResonse = await axios.get(`/api/sheets/${sheetId}`)
    const sheet = sheetResonse.data
    this.sheet = sheet

    const sheetItemsResponse = await axios.get(`/api/dashboard/sheets/${sheetId}`)
    const sheetItems = sheetItemsResponse.data
    this.sheetItems = sheetItems
      .sort(function (a, b) {
        return new Date(b.date) - new Date(a.date)
      })
      .reverse()
  },
  components: {
    PageNotFound,
    SheetDetails,
  },
}
</script>
