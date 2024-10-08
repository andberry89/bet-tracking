<template>
  <div
    class="sheet-view"
    v-if="dataReady"
  >
    <div class="sheet-date">{{ sheet.name ? sheet.name : date }}</div>
    <div class="sheet-record">{{ getSheetRecord() }}</div>
    <div
      v-for="(prop, index) in this.sheetProps"
      :key="prop.name"
      class="sheet-props-wrap"
    >
      <div class="sheet-props-header">
        {{ getKeyName(index) }} <span v-if="!sheet.open">({{ getRecord(index) }})</span>
      </div>
      <div class="col-header-row">
        <span class="name-col">Player</span>
        <span class="ou-col">O/U</span>
        <span class="line-col">Line</span>
        <span class="result-col">Result</span>
      </div>
      <SheetLine
        v-for="player in getValues(index)"
        :key="player._id"
        :line="player"
        class="sheet-line"
      />
    </div>
  </div>
</template>
<script>
import dateFormat from 'dateformat'
import propNames from '@/utils/sheets/propNames'
import SheetLine from './SheetLine.vue'

export default {
  name: 'SheetView',
  data() {
    return {
      dataReady: false,
      sheetProps: [],
    }
  },
  props: {
    sheet: {
      type: Object,
    },
  },
  components: {
    SheetLine,
  },
  computed: {
    date() {
      return dateFormat(this.sheet.date, 'UTC:mm/dd/yyyy')
    },
    header(index) {
      return Object.values(this.sheetProps[index][0])
    },
  },
  methods: {
    dateFormat: dateFormat,
    propNames: propNames,
    getKey(index) {
      return Object.keys(this.sheetProps[index])[0]
    },
    getKeyName(index) {
      return Object.values(this.sheetProps[index])[0]
    },
    getRecord(index) {
      const values = this.getValues(index)
      const len = values.length
      const hit = values.filter(e => e.hit).length
      return hit + '/' + len
    },
    getSheetRecord() {
      let hit = 0
      let total = 0
      const len = this.sheet.props.length
      for (let i = 0; i < len; i++) {
        const valuesLen = this.sheet.props[i].values.length
        total += valuesLen
        hit += this.getValues(i).filter(e => e.hit).length
      }
      return hit + '/' + total + ' -- ' + (hit * 100) / total + '%'
    },
    getValues(index) {
      const propsIdx = this.sheet.props.findIndex(e => e.name === this.getKey(index))
      return this.sheet.props[propsIdx].values
    },
  },
  created() {
    this.sheetProps = propNames(this.sheet.sheet)
    this.dataReady = true
  },
}
</script>
<style scoped>
.sheet-date {
  margin: 15px 10px;
  font-weight: 700;
  font-size: 24px;
  border-left: 6px solid var(--white);
  padding-left: 10px;
}
.sheet-record {
  margin: 10px;
  font-weight: 700;
  font-size: 20px;
  border-left: 6px solid var(--white);
  padding-left: 10px;
}
.sheet-props-wrap {
  width: 45%;
  display: inline-block;
  border: 1px solid var(--white);
  border-radius: 8px;
  margin: 5px 10px;
  overflow: hidden;
}
.sheet-props-header {
  background-color: var(--green);
  padding: 8px;
  font-weight: 700;
  text-transform: uppercase;
}
.col-header-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  place-items: center;
  padding: 4px 2px;
}
.col-header-row span {
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 700;
  color: var(--green);
}
.sheet-line:not(:first-child) {
  border-top: 1px solid var(--white);
}
</style>
