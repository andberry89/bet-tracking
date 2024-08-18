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
import SheetInputField from '@/components/dashboard/sheets/components/SheetInputField.vue'
import propNames from '@/utils/sheets/propNames'
import updateValue from '@/utils/updateValue'

//TODO: FORMAT SHEET AND POST TO DATABASE

export default {
  name: 'SheetInput',
  data() {
    return {
      props: [],
      details: {
        date: '',
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
    updateValue: updateValue,
    addSheet() {
      console.log(this.details)
    },
    updateDetails(prop, lines) {
      this.details[prop] = lines
    },
  },
  async created() {
    this.props = propNames(this.sheetId)
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
