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
import getCurrentSeason from '@/components/sheets/utils/getCurrentSeason'

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
  methods: {
    getCurrentSeason: getCurrentSeason,
  },
  async created() {
    const sheetId = this.$route.params.sheetId
    this.sheetId = sheetId

    const season = getCurrentSeason(sheetId)

    const sheetResponse = await axios.get(`/api/sheets/${sheetId}`)
    const sheet = sheetResponse.data
    this.sheet = sheet

    let sheetItems = []
    await axios.get(`/api/dashboard/sheets/${sheetId}/${season}`).then(res => {
      sheetItems = res.data
      this.sheetItems = sheetItems.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date)
      })
    })

    if (sheetItems.length > 0) {
      this.dataReady = true
    }
  },
  components: {
    PageNotFound,
    SheetDetails,
  },
}
</script>
