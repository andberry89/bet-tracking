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
          <h4>{{ getKeyName(prop) }}</h4>
          <span v-if="!sheet.open">({{ getRecord(prop) }})</span>
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
      let values = this.getValues(prop).filter(e => !e.void)
      const len = values.length
      const hit = values.filter(e => e.hit).length
      return hit + '/' + len
    },
    getSheetRecord() {
      let hit = 0
      let total = 0
      const props = this.sheet.props

      props.forEach(prop => {
        let values = this.getValues(prop.name)
        if (Array.isArray(values) && values.length) {
          values = values.filter(e => !e.void)
          total += values.length
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
  font-size: 28px;
  font-family: 'Russo One';
  text-align: center;
}
.sheet-record {
  margin: 10px;
  font-weight: 700;
  font-size: 24px;
  font-family: 'Russo One';
  text-align: center;
}
.sheet-props {
  width: 48%;
  display: inline-block;
  border: 1px solid var(--white);
  border-radius: 8px;
  margin: 5px 10px;
  overflow: hidden;
  vertical-align: top;
}
.sheet-props-header {
  padding: 8px;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
}
.sheet-props-header h4 {
  margin: 0;
  padding: 0;
  font-family: 'Russo One';
  font-size: 30px;
}
.odds-col {
  padding-right: 10px;
}
.sheet-line:not(:first-child) {
  border-top: 1px solid var(--white);
}
</style>
