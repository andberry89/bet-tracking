<template>
  <div v-if="dataReady">
    <h3>{{ dateFormat(this.sheet.date, 'UTC:mm/dd/yyyy') }}</h3>
    <div
      v-for="(prop, index) in this.details.props"
      :key="prop.name"
      class="sheet-props-wrap"
    >
      <div class="prop-header">
        <span class="header-text">{{ getKeyName(index) }}</span>
        <div
          v-for="(player, idx) in getValues(index)"
          :key="player._id"
          class="edit-sheet-line"
        >
          <span class="name-text">{{ player.player }}</span>
          <span class="ou-text">{{ player.overUnder }}</span>
          <span class="line-text">{{ player.line }}</span>
          <input
            type="number"
            placeholder="Result"
            step="1"
            @keyup="updateResult(index, idx, player, $event.target.value)"
            @keydown="updateResult(index, idx, player, $event.target.value)"
            @change="updateResult(index, idx, player, $event.target.value)"
          />
        </div>
      </div>
    </div>
    <div class="msg-div">{{ this.msg }}</div>
    <div class="update-btn">
      <button @click="settleSheet">Update Sheet</button>
      <button @click="deleteSheet">Delete Sheet</button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import dateFormat from 'dateformat'
import propNames from '@/utils/sheets/propNames'
export default {
  name: 'EditSheet',
  data() {
    return {
      dataReady: false,
      details: {},
      msg: '',
      sheetProps: [],
    }
  },
  props: {
    sheet: {
      type: Object,
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
    getValues(index) {
      const propsIdx = this.sheet.props.findIndex(e => e.name === this.getKey(index))
      return this.sheet.props[propsIdx].values
    },
    async deleteSheet() {
      const path = `/api/dashboard/sheets/${this.details.sheet}/${this.details._id}`
      console.log(path)
      await axios
        .delete(path, this.details._id)
        .then(res => {
          if (res.status === 200) {
            this.msg = 'Sheet Deleted Successfully!'
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    async settleSheet() {
      const updates = {
        _id: this.details._id,
        open: false,
        props: this.details.props,
      }
      const path = `/api/dashboard/sheets/${this.details.sheet}/${this.details._id}`
      await axios
        .patch(path, updates)
        .then(res => {
          if (res.status === 201) {
            this.msg = 'Sheet Updated Successfully!'
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateResult(index, idx, player, value) {
      value = parseInt(value)
      this.details.props[index].values[idx].result = value
      const ou = player.overUnder
      const line = player.line
      if (ou === 'over') {
        this.details.props[index].values[idx].hit = value > line ? true : false
      } else {
        this.details.props[index].values[idx].hit = value < line ? true : false
      }
    },
  },
  created() {
    this.sheetProps = propNames(this.sheet.sheet)
    this.details = this.sheet
    this.dataReady = true
  },
}
</script>
<style scoped>
.sheet-props-wrap {
  border: 1px solid var(--white);
  border-radius: 8px;
  padding: 4px;
  margin: 10px 0;
}
h3 {
  margin: 0 0 10px 0;
}
.header-text {
  font-weight: 700;
  border-bottom: 2px solid var(--white);
  border-right: 2px solid var(--white);
  border-radius: 8px;
  padding: 5px;
  display: inline-block;
  margin-bottom: 5px;
}
.edit-sheet-line {
  display: grid;
  grid-template-columns: 1fr max-content max-content 100px;
  place-items: center;
  justify-content: space-between;
  grid-gap: 10px;
  font-size: 14px;
}
.name-text {
  font-weight: 700;
  justify-self: end;
}
.ou-text {
  text-transform: capitalize;
}
input {
  width: 100px;
}
button {
  margin: 0 5px;
}
.update-btn,
.msg-div {
  text-align: center;
}
</style>
