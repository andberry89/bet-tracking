<template>
  <div
    class="modal-line-wrap"
    :style="backgroundStyleObject"
  >
    <div class="date">{{ getDateName(line) }}</div>
    <div class="ou-line">
      <span>{{ line.overUnder }}</span> <span>{{ line.line }}</span> <span>{{ getPropName }}</span>
    </div>
    <div
      class="result"
      :style="dynamicTextColor"
    >
      {{ line.void ? 'Void' : line.result }}
    </div>
    <div class="odds">{{ getOdds }}</div>
  </div>
</template>
<script>
import dateFormat from 'dateformat'

export default {
  name: 'ModalPlayerCardLine',
  props: {
    line: {
      type: Object,
      required: true,
    },
    propName: {
      type: String,
      required: true,
    },
  },
  computed: {
    backgroundStyleObject() {
      let color = ''
      let fadeColor = ''
      if (this.line.void) {
        color = 'rgb(255,131,23)'
        fadeColor = 'rgba(255, 131, 23, 0.2)'
      } else {
        color = this.line.hit ? 'rgb(21,198,60)' : 'rgb(204,0,0)'
        fadeColor = this.line.hit ? 'rgba(21,198,60,0.2)' : 'rgba(204,0,0,0.2)'
      }
      return {
        background: `linear-gradient(125deg, ${color} 0%, ${fadeColor} 65%)`,
      }
    },
    dynamicTextColor() {
      let color = ''
      if (this.line.void) {
        color = 'rgb(255,131,23)'
      } else {
        color = this.line.hit ? 'rgb(21,198,60)' : 'rgb(204,0,0)'
      }
      return {
        color: color,
      }
    },
    getOdds() {
      if (this.line.odds === '' || this.line.odds === 0 || this.line.odds === null || this.line.odds === undefined) {
        return ''
      }
      let odds = this.line.odds
      if (odds > 0) {
        odds = '+' + odds
      }
      return odds
    },
    getPropName() {
      if (!this.line.altProp) {
        return this.propName
      } else {
        return this.line.altProp === '' ? this.propName : this.line.altProp
      }
    },
  },
  methods: {
    dateFormat: dateFormat,
    getDateName(line) {
      if (line.sheetName !== '') {
        return line.sheetName
      } else {
        return dateFormat(line.date, 'UTC:mm/dd/yyyy')
      }
    },
  },
}
</script>
<style scoped>
.modal-line-wrap {
  display: grid;
  grid-template-columns: 200px 2fr 1fr 1fr;
  gap: 15px;
  text-align: center;
  margin: 8px 0;
}
.date {
  text-align: right;
}
.ou-line {
  text-align: center;
}
.ou-line span {
  margin: 0 2px;
}
</style>
