<template>
  <div
    v-if="sheet"
    class="wrap"
  >
    <h3>{{ sheet.name }}</h3>

    <div class="date-wrapper">
      <button
        v-for="item in sheetItems"
        :key="item._id"
        class="sheet-date-grid-item"
        @click="updateSheet(sheetItems, item._id)"
      >
        {{ dateFormat(item.date, 'UTC:mm/dd/yyyy') }}
      </button>
    </div>
    <hr />
    <h2>New Sheet</h2>
    <SheetInput :sheetId="sheetId" />
  </div>
  <div v-else>
    <PageNotFound />
  </div>
</template>

<script>
// TODO: FORMAT SHEET APPEARANCE
import PageNotFound from './PageNotFound.vue'
import SheetInput from '../dashboard/sheets/SheetInput.vue'
import axios from 'axios'
import dateFormat from 'dateformat'
import updateActiveSheet from '@/components/sheets/utils/updateActiveSheet'
import '../dashboard/styles/dashboard.css'

export default {
  name: 'SheetDashboard',
  data() {
    return {
      activeSheet: 0,
      sheet: {},
      sheetId: '',
      sheetItems: [],
    }
  },
  components: {
    PageNotFound,
    SheetInput,
  },
  methods: {
    dateFormat: dateFormat,
    updateActiveSheet: updateActiveSheet,
    updateSheet(items, id) {
      this.activeSheet = updateActiveSheet(items, id)
    },
  },
  async created() {
    const sheetId = this.$route.params.sheetId
    this.sheetId = sheetId

    const sheetResponse = await axios.get(`/api/sheets/${sheetId}`)
    const sheet = sheetResponse.data
    this.sheet = sheet

    const sheetItemsResponse = await axios.get(`/api/dashboard/sheets/${sheetId}`)
    const sheetItems = sheetItemsResponse.data
    this.sheetItems = sheetItems
      .sort(function (a, b) {
        return new Date(b.date) - new Date(a.date)
      })
      .reverse()
  },
}
</script>
