<template>
  <div class="page-header">
    <div class="hero-section">
      <div class="img-wrap">
        <img :src="sheet.imageUrl" />
        <div class="item-name">{{ sheet.name }} - {{ sheetItems[0].season }} Season</div>
      </div>
      <SheetPerformance
        v-if="settledSheets.length > 0"
        :sheets="settledSheets"
      />
    </div>
    <div class="date-wrapper">
      <button
        v-for="item in sheetItems"
        :key="item._id"
        class="sheet-date-grid-item"
        :class="{ activeButton: isActive(item._id) }"
        @click="updateSheet(sheetItems, item._id)"
      >
        {{ item.name ? item.name : dateFormat(item.date, 'UTC:mm/dd/yyyy') }}
      </button>
    </div>
    <hr />
    <SheetView :sheet="activeSheet" />
  </div>
</template>

<script>
/**
 * TODO
 * SET UP THE API TO PULL ALL TEAM DATA ONCE PER DAY - MLB TEAM PLAYERS
 * CREATE A LIST OF ATHLETES FROM ALL TEAMS
 * RUN AN AUDIT OVER NIGHT TO CHECK SHEETS - USING MLB SUMMARY
 */
import SheetView from './SheetView.vue'
import dateFormat from 'dateformat'
import updateActiveSheet from '@/components/sheets/utils/updateActiveSheet'
import SheetPerformance from './components/SheetPerformance.vue'

export default {
  name: 'SheetDetails',
  data() {
    return {
      activeSheetIdx: 0,
      settledSheets: [],
    }
  },
  components: {
    SheetPerformance,
    SheetView,
  },
  props: {
    sheet: {
      type: Object,
    },
    sheetItems: {
      type: Array,
    },
  },
  computed: {
    activeSheet() {
      return this.sheetItems[this.activeSheetIdx]
    },
  },
  methods: {
    dateFormat: dateFormat,
    updateActiveSheet: updateActiveSheet,
    isActive(id) {
      return this.activeSheet._id === id
    },
    updateSheet(items, id) {
      this.activeSheetIdx = updateActiveSheet(items, id)
    },
  },
  created() {
    if (this.sheetItems.length > 0) {
      this.settledSheets = this.sheetItems.filter(e => !e.open)
    }
  },
}
</script>
<style scoped>
.page-header {
  padding-top: 8px;
}
.date-wrapper {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  margin-top: 15px;
}
.hero-section {
  display: flex;
  flex-flow: column nowrap;
}
.img-wrap {
  display: flex;
  flex-direction: column;
}
.item-name {
  font-size: 30px;
}
</style>
