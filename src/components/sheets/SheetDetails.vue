<template>
  <div class="page-header">
    <div class="img-wrap">
      <!-- <img :src="sheet.imageUrl" /> -->
      <div class="item-name">{{ sheet.name }}</div>
    </div>
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
    <SheetView :sheet="sheetItems[activeSheet]" />
  </div>
</template>

<script>
/** TODO
 * SET UP THE API TO PULL ALL TEAM DATA ONCE PER DAY - MLB TEAM PLAYERS
 * CREATE A LIST OF ATHLETES FROM ALL TEAMS
 * RUN AN AUDIT OVER NIGHT TO CHECK SHEETS - USING MLB SUMMARY
 */
import SheetView from './SheetView.vue'
import dateFormat from 'dateformat'
import updateActiveSheet from '@/components/sheets/utils/updateActiveSheet'

export default {
  name: 'SheetDetails',
  data() {
    return {
      activeSheet: 0,
    }
  },
  components: {
    SheetView,
  },
  props: {
    sheet: {
      type: Object,
    },
    sheetId: {
      type: String,
    },
    sheetItems: {
      type: Array,
    },
  },
  methods: {
    dateFormat: dateFormat,
    updateActiveSheet: updateActiveSheet,
    updateSheet(items, id) {
      this.activeSheet = updateActiveSheet(items, id)
    },
  },
}
</script>
