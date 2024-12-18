<template>
  <div class="page-header">
    <div class="hero-section">
      <div class="img-wrap">
        <img :src="sheet.imageUrl" />
        <div class="item-name">{{ sheet.name }} - {{ sheetItems[0].season }} Season</div>
      </div>
      <div class="section-buttons-wrap">
        <button
          v-for="section in sections"
          :key="section.name"
          :class="{ activeButton: isActiveSheet(section.name) }"
          @click="updateSection(section.name)"
        >
          {{ section.name }}
        </button>
      </div>
      <SheetPerformance
        v-if="showSeason"
        :sheets="settledSheets"
      />
    </div>
    <PlayerPerformance
      v-if="activeSection === 'Players'"
      :players="this.results.players"
    />
    <SheetView
      v-if="activeSection === 'Sheet'"
      :sheet="activeSheet"
    />
    <div
      class="date-wrapper"
      v-if="showButtons"
    >
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
  </div>
</template>

<script>
import SheetView from './SheetView.vue'
import dateFormat from 'dateformat'
import updateActiveSheet from '@/components/sheets/utils/updateActiveSheet'
import calcSheetPerformance from './utils/calcSheetPerformance'
import SheetPerformance from './components/SheetPerformance.vue'
import PlayerPerformance from './components/PlayerPerformance.vue'

export default {
  name: 'SheetDetails',
  data() {
    return {
      activeSheetIdx: 0,
      settledSheets: [],
      showPlayers: false,
      activeSeason: true,
      showButtons: false,
      results: {},
      activeSection: 'Sheet',
      sections: [
        {
          name: 'Sheet',
        },
        {
          name: 'Season',
        },
        {
          name: 'Players',
        },
      ],
    }
  },
  components: {
    PlayerPerformance,
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
    showSeason() {
      return this.settledSheets.length > 0 && this.activeSection === 'Season'
    },
  },
  methods: {
    dateFormat: dateFormat,
    updateActiveSheet: updateActiveSheet,
    close() {
      this.show = false
    },
    isActive(id) {
      return this.activeSheet._id === id
    },
    isActiveSheet(name) {
      return this.activeSection === name
    },
    updateSection(name) {
      this.activeSection = name
    },
    updateSheet(items, id) {
      this.activeSheetIdx = updateActiveSheet(items, id)
    },
  },
  created() {
    if (this.sheetItems.length > 0) {
      this.settledSheets = this.sheetItems.filter(e => !e.open)
      this.results = calcSheetPerformance(this.settledSheets)
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
.section-buttons-wrap {
  display: flex;
  flex-flow: row nowrap;
  gap: 5px;
  justify-content: center;
}
.item-name {
  font-family: 'Russo One';
  font-size: 36px;
}
</style>
