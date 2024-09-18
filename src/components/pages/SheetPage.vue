<template>
  <div v-if="dataReady">
    <SheetDetails
      :sheet="sheet"
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
      dataReady: false,
      sheet: {},
      sheetId: '',
      sheetItems: [],
    }
  },
  async created() {
    const sheetId = this.$route.params.sheetId
    this.sheetId = sheetId

    const sheetResponse = await axios.get(`/api/sheets/${sheetId}`)
    const sheet = sheetResponse.data
    this.sheet = sheet

    const sheetItemsResponse = await axios.get(`/api/dashboard/sheets/${sheetId}`)
    const sheetItems = sheetItemsResponse.data
    this.sheetItems = sheetItems.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date)
    })

    this.dataReady = true
  },
  components: {
    PageNotFound,
    SheetDetails,
  },
}
</script>
