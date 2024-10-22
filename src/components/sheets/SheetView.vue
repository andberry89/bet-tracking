<template>
  <div
    class="sheet-view"
    v-if="dataReady"
  >
    <div class="sheet-date">{{ sheet.name ? sheet.name : date }}</div>
    <div class="sheet-record">{{ getSheetRecord() }}</div>
    <div class="sheet-props-wrap">
      <div
        v-for="prop in this.actualProps"
        :key="prop"
        class="sheet-props"
      >
        <div class="sheet-props-header">
          {{ getKeyName(prop) }} <span v-if="!sheet.open">({{ getRecord(prop) }})</span>
        </div>
        <div class="col-header-row">
          <span class="name-col">Player</span>
          <span class="ou-col">O/U</span>
          <span class="line-col">Line</span>

          <span class="result-col">Result</span>
          <span
            class="odds-col"
            v-if="showOdds"
            >Odds</span
          >
        </div>
        <SheetLine
          v-for="player in getValues(prop)"
          :key="player._id"
          :line="player"
          class="sheet-line"
        />
      </div>
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
      actualProps: [],
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
    showOdds() {
      return parseInt(this.sheet.props[0].values[0].odds)
    },
  },
  methods: {
    dateFormat: dateFormat,
    propNames: propNames,
    getKeyName(prop) {
      const idx = Object.keys(this.sheetProps).filter(key => {
        return prop === Object.keys(this.sheetProps[key])[0]
      })
      const value = this.sheetProps[idx][prop]
      return value
    },
    getRecord(prop) {
      const values = this.getValues(prop)
      const len = values.length
      const hit = values.filter(e => e.hit).length
      return hit + '/' + len
    },
    getSheetRecord() {
      let hit = 0
      let total = 0
      const props = this.sheet.props

      props.forEach(prop => {
        const values = this.getValues(prop.name)
        const valuesLen = values.length
        if (Array.isArray(values) && values.length) {
          total += valuesLen
          hit += values.filter(e => e.hit).length
        }
      })
      const percentage = ((hit * 100) / total).toFixed(2)
      return hit + '/' + total + ' -- ' + percentage + '%'
    },
    getValues(prop) {
      const propsIdx = this.sheet.props.findIndex(e => e.name === prop)
      if (propsIdx > -1) {
        return this.sheet.props[propsIdx].values
      } else {
        return []
      }
    },
  },
  created() {
    this.sheetProps = propNames(this.sheet.sheet)
    this.dataReady = true

    this.sheet.props.forEach(e => {
      this.actualProps.push(e.name)
    })
    this.dataReady = true
  },
  watch: {
    sheet: {
      handler(val) {
        this.actualProps = []
        val.props.forEach(e => {
          this.actualProps.push(e.name)
        })
      },
      deep: true,
    },
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
.sheet-props {
  width: 45%;
  display: inline-block;
  border: 1px solid var(--white);
  border-radius: 8px;
  margin: 5px 10px;
  overflow: hidden;
  vertical-align: top;
}
.sheet-props-header {
  background-color: var(--green);
  padding: 8px;
  font-weight: 700;
  text-transform: uppercase;
}
.col-header-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr max-content;
  place-items: center;
  padding: 4px 2px;
}
.col-header-row span {
  text-transform: uppercase;
  display: inline-block;
  font-size: 14px;
  font-weight: 700;
  color: var(--green);
}
.odds-col {
  padding-right: 10px;
}
.sheet-line:not(:first-child) {
  border-top: 1px solid var(--white);
}
</style>
