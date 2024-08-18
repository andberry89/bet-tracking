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
        @click="updateActiveSheet(item._id)"
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
    updateActiveSheet(id) {
      const idx = this.sheetItems.findIndex(e => e._id === id)
      this.activeSheet = idx
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
    this.sheetItems = sheetItems.reverse()
  },
}
</script>
<style scoped>
.date-wrapper {
  display: flex;
  gap: 8px;
}
.sheet-date-grid-item {
  padding: 8px 16px;
  border: 1px solid var(--green);
  border-radius: 8px;
  cursor: pointer;
}
</style>
