<template>
  <div v-if="dataReady">
    <h3>{{ dateFormat(this.sheet.date, 'UTC:mm/dd/yyyy') }}</h3>
    <EditSheetProp
      v-for="(prop, index) in this.details.props"
      :key="prop.name + '-pill'"
      :name="getKeyName(prop.name, this.sheetProps)"
      :prop="prop"
      :values="getValues(prop.name, this.sheet.props)"
      @update="updateResult(index, $event)"
    />
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
import EditSheetProp from './components/EditSheetProp.vue'
import propNames from '@/utils/sheets/propNames'
import getKeyName from '@/components/sheets/utils/getKeyName'
import getValues from '@/components/sheets/utils/getValues'

export default {
  name: 'EditSheet',
  data() {
    return {
      actualProps: [],
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
  components: {
    EditSheetProp,
  },
  methods: {
    dateFormat: dateFormat,
    propNames: propNames,
    getKeyName: getKeyName,
    getValues: getValues,
    async deleteSheet() {
      const path = `/api/dashboard/sheets/${this.details.sheet}/${this.details._id}`
      const body = { id: this.details._id }
      console.log(path)
      console.log(body)
      await axios
        .delete(path, body)
        .then(res => {
          if (res.status === 200) {
            this.msg = 'Sheet Deleted Successfully!'
            location.reload()
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
            location.reload()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateResult(index, prop) {
      this.details.props[index] = prop
    },
  },
  created() {
    this.sheetProps = propNames(this.sheet.sheet)
    this.details = this.sheet
    this.details.props.forEach(e => {
      this.actualProps.push(e.name)
    })
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
  grid-template-columns: 1fr max-content max-content 100px max-content;
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
.void-wrap {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}
input[type='number'] {
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
