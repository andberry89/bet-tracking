<template>
  <div class="sheet-boxes-wrap">
    <button @click="addSheet">Add Sheet</button>
    <InputDate
      name="sheet-date"
      label="Date"
      class="date-field"
      :value="this.details.date"
      @update="updateValue(details, 'date', $event)"
    />
    <div class="sheet-wrap">
      <SheetInputField
        v-for="(prop, index) in props"
        class="sheet-input-field"
        :key="index"
        :header="Object.values(prop)[0]"
        @update="updateDetails(Object.keys(prop)[0], $event)"
      />
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import SheetInputField from '@/components/dashboard/sheets/components/SheetInputField.vue'
import formatSheet from '@/components/dashboard/sheets/utils/formatSheet'
import propNames from '@/utils/sheets/propNames'
import updateValue from '@/utils/updateValue'

export default {
  name: 'SheetInput',
  data() {
    return {
      props: [],
      errMsg: '',
      details: {
        date: '',
        sheet: '',
      },
    }
  },
  props: {
    sheetId: {
      type: String,
      required: true,
    },
  },
  components: {
    SheetInputField,
  },
  methods: {
    formatSheet: formatSheet,
    updateValue: updateValue,
    async addSheet() {
      const sheetDetails = formatSheet(this.props, this.details)
      await axios
        .post(`/api/dashboard/sheets/${this.sheetId}`, sheetDetails)
        .then(res => {
          if (res.status === 201) {
            console.log('Sheet Successful.')
            location.reload()
          }
        })
        .catch(err => {
          let errMsg = 'Error: '
          if (err.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(err.response.data)
            console.log(err.response.status)
            errMsg += err.response.data._message
          } else if (err.request) {
            // The request was made but no response was received
            console.log(err.request)
            errMsg = 'Hooked by the server. Check your internet connection and try again'
          } else {
            // Something happened in setting up the request that triggered an Error
            errMsg += err.message + ' Contact the administrator if problem continues.'
            console.log('Error', err.message)
          }
          console.log(err.config)
          this.errMsg = errMsg
        })
    },
    updateDetails(prop, lines) {
      this.details[prop] = lines
    },
  },
  async created() {
    this.props = propNames(this.sheetId)
    this.details.sheet = this.sheetId
  },
}
</script>
<style scoped>
.sheet-boxes-wrap {
  text-align: center;
}
.date-field {
  width: 120px;
  margin: 15px auto;
}
.sheet-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 12px;
}
.sheet-input-field {
  width: 40%;
}
</style>
