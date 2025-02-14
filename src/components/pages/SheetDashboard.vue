<template>
  <div
    v-if="dataReady"
    class="wrap"
  >
    <ModalOverlay
      :showModal="show"
      @update="close"
    >
      <div class="modal">
        <EditSheet :sheet="sheetItems[activeSheet]" />
      </div>
    </ModalOverlay>
    <h3>{{ sheet.name }}</h3>

    <div class="date-wrapper">
      <button
        v-for="item in openSheets"
        :key="item._id"
        class="sheet-date-grid-item"
        @click="editSheet(sheetItems, item._id)"
      >
        {{ item.name ? item.name : dateFormat(item.date, 'UTC:mm/dd/yyyy') }}
      </button>
    </div>
    <hr />
    <h2>New Sheet</h2>
    <SheetInput
      :sheetId="sheetId"
      :playerList="playerList"
    />
  </div>
  <div v-else>
    <PageNotFound />
  </div>
</template>

<script>
import PageNotFound from './PageNotFound.vue'
import SheetInput from '../dashboard/sheets/SheetInput.vue'
import axios from 'axios'
import dateFormat from 'dateformat'
import updateActiveSheet from '@/components/sheets/utils/updateActiveSheet'
import EditSheet from '@/components/dashboard/sheets/EditSheet.vue'
import getCurrentSeason from '../sheets/utils/getCurrentSeason'
import '../dashboard/styles/dashboard.css'

export default {
  name: 'SheetDashboard',
  data() {
    return {
      activeSheet: 0,
      closedSheets: [],
      dataReady: false,
      openSheets: [],
      playerList: [],
      sheet: {},
      sheetId: '',
      sheetItems: [],
      show: false,
    }
  },
  components: {
    EditSheet,
    PageNotFound,
    SheetInput,
  },
  methods: {
    dateFormat: dateFormat,
    getCurrentSeason: getCurrentSeason,
    updateActiveSheet: updateActiveSheet,
    close() {
      this.show = false
    },
    editSheet(items, id) {
      this.activeSheet = updateActiveSheet(items, id)
      this.show = true
    },
  },
  async created() {
    const sheetId = this.$route.params.sheetId
    this.sheetId = sheetId

    const season = getCurrentSeason(sheetId)

    const sheetResponse = await axios.get(`/api/sheets/${sheetId}`)
    const sheet = sheetResponse.data
    this.sheet = sheet

    const playerListResponse = await axios.get(`/api/players/${this.sheet.league}`)
    this.playerList = playerListResponse.data

    const sheetItemsResponse = await axios.get(`/api/dashboard/sheets/${sheetId}/${season}`)
    const sheetItems = sheetItemsResponse.data
    this.sheetItems = sheetItems
      .sort(function (a, b) {
        return new Date(b.date) - new Date(a.date)
      })
      .reverse()

    this.closedSheets = this.sheetItems.filter(e => !e.open)
    this.openSheets = this.sheetItems.filter(e => e.open)

    this.dataReady = true
  },
}
</script>
<style scoped></style>
