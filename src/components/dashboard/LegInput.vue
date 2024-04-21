<template>
  <div class="leg-input-wrap">
    <div>{{ isEdit ? 'Edit' : 'Input' }} Leg</div>
    <SelectComponent
      name="sports"
      id="sport-select"
      :options="marketOptions"
      class="input-item"
      :class="isValidMarket ? 'valid' : 'invalid'"
      @update="updateValue(details, 'market', $event)"
    />
    <InputText
      type="text"
      for="subject"
      placeholder="Team / Player / Game"
      :value="this.details.subject"
      :class="isValidSubject ? 'valid' : 'invalid'"
      @update="updateValue(details, 'subject', $event)"
    />
    <SelectComponent
      name="overUnder"
      id="over-under-select"
      :options="overUnderOptions"
      :class="isValidOU ? 'valid' : 'invalid'"
      @update="updateValue(details, 'over', $event)"
    />
    <InputNumber
      for="line"
      placeholder="Line"
      step="0.25"
      :value="this.details.line"
      :disabled="disableLine"
      :class="isLine ? 'valid' : 'invalid'"
      @update="updateValue(details, 'line', $event)"
    />
    <InputText
      type="text"
      for="prop"
      placeholder="Prop"
      class="prop-input"
      :disabled="isSpreadOrMoneyline"
      :value="this.details.prop"
      :class="isValidProp ? 'valid' : 'invalid'"
      @update="updateValue(details, 'prop', $event)"
    />
    <SVGPlusMinus
      v-if="isValidLeg"
      class="add-leg-btn"
      height="35px"
      width="35px"
      type="plus"
      @click="addLeg"
    />
  </div>
</template>
<script>
import updateValue from '@/utils/updateValue'
import { findSport } from '@/utils/handleLegs'
import { marketOptions, overUnderOptions } from '@/utils/selectOptions'
import { validateMarket, validateSubject, validateLine, validateProp } from '@/utils/validateLeg.js'

export default {
  name: 'LegInput',
  data() {
    return {
      details: {
        market: '',
        subject: '',
        over: '',
        line: '',
        prop: '',
        sport: '',
      },
      isValidMarket: false,
      isValidSubject: false,
      isValidOU: false,
      isValidLine: false,
      isValidProp: false,
      yesNoOptions: ['Yes', 'No'],
      marketOptions: marketOptions,
      overUnderOptions: overUnderOptions,
    }
  },
  props: {
    type: {
      type: String,
      required: false,
      default: 'add',
    },
  },
  computed: {
    disableLine() {
      return this.isOverOrUnder && (this.details.over === 'Other' || this.details.over === 'Moneyline')
    },
    isEdit() {
      return this.type === 'edit'
    },
    isOverOrUnder() {
      return this.isValidOU
    },
    isLine() {
      return this.isValidLine
    },
    isSpreadOrMoneyline() {
      return this.details.over === 'Spread' || this.details.over === 'Moneyline'
    },
    isValidLeg() {
      return this.isValidMarket && this.isValidSubject && this.isValidOU && this.isValidLine && this.isValidProp
    },
  },
  methods: {
    findSport: findSport,
    updateValue: updateValue,
    validateLine: validateLine,
    validateMarket: validateMarket,
    validateProp: validateProp,
    validateSubject: validateSubject,
    addLeg() {
      this.$emit('update', findSport(this.details))
      this.details = {
        market: '',
        subject: '',
        over: '',
        line: '',
        prop: '',
      }
      document.getElementById('sport-select').selectedIndex = 0
      document.getElementById('over-under-select').selectedIndex = 0
      this.isValidMarket = false
      this.isValidSubject = false
      this.isValidOU = false
      this.isValidLine = false
      this.isValidProp = false
    },
  },
  watch: {
    'details.market': {
      handler(val) {
        this.isValidMarket = validateMarket(val)
      },
      deep: true,
    },
    'details.subject': {
      handler(val) {
        this.isValidSubject = validateSubject(val)
      },
      deep: true,
    },
    'details.over': {
      handler(val) {
        this.isValidLine = false
        this.isValidProp = false
        this.isValidOU = false
        let line = parseFloat(this.details.line)
        let prop = this.details.prop
        let over = val
        switch (val) {
          case 'Over':
            this.isValidOU = true
            this.isValidLine = validateLine(line, true, over)
            this.isValidProp = validateProp(prop, false)
            break
          case 'Under':
            this.isValidOU = true
            this.isValidLine = validateLine(line, true, over)
            this.isValidProp = validateProp(prop, false)
            break
          case 'Spread':
            this.isValidOU = true
            this.details.prop = ''
            this.isValidProp = true
            this.isValidLine = validateLine(line, true, over)
            break
          case 'Moneyline':
            this.isValidOU = true
            this.details.prop = ''
            this.isValidProp = true
            this.details.line = ''
            this.isValidLine = true
            break
          case 'Other':
            this.isValidOU = true
            this.details.line = ''
            this.isValidLine = true
            this.isValidProp = validateProp(prop, false)
            break
          default:
            this.isValidOU = false
        }
      },
      deep: true,
    },
    'details.line': {
      handler(val) {
        this.isValidLine = validateLine(val, this.isOverOrUnder, this.details.over)
      },
      deep: true,
    },
    'details.prop': {
      handler(val) {
        this.isValidProp = validateProp(val, this.isSpread)
      },
      deep: true,
    },
  },
}
</script>
<style scoped>
.leg-input-wrap {
  display: grid;
  grid-template-columns: 90px 2fr 2fr 90px 1fr 2fr 35px;
  column-gap: 5px;
  place-items: start;
  align-items: center;
  background-color: var(--white);
  color: var(--black);
  padding: 0 5px;
  width: 100%;
  height: 40px;
  border-radius: 8px;
  border: 1px solid var(--orange);
}
.leg-input {
  height: 100%;
}
.valid {
  border: 1px solid var(--green);
}
.invalid {
  border: 1px solid var(--red);
}
</style>
