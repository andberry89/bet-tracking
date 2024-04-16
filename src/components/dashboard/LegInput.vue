<template>
  <div class="leg-input-wrap">
    <div>Input Leg</div>
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
      step="0.5"
      min="0"
      :value="this.details.line"
      :disabled="!isOverOrUnder"
      :class="isValidLine ? 'valid' : 'invalid'"
      @update="updateValue(details, 'line', $event)"
    />
    <InputText
      type="text"
      for="prop"
      placeholder="Prop"
      class="prop-input"
      :value="this.details.prop"
      :class="isValidProp ? 'valid' : 'invalid'"
      @update="updateValue(details, 'prop', $event)"
    />
    <SVGPlus
      v-if="isValidLeg"
      class="add-leg-btn"
      height="35px"
      width="35px"
      @click="addLeg"
    />
  </div>
</template>
<script>
import updateValue from '@/utils/updateValue'
import { marketOptions, overUnderOptions } from '@/utils/selectOptions'

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
  computed: {
    isValidLeg() {
      return this.isValidMarket && this.isValidSubject && this.isValidOU && this.isValidLine && this.isValidProp
    },
    isOverOrUnder() {
      if (this.details.over === 'Over' || this.details.over === 'Under') {
        return true
      } else {
        return false
      }
    },
  },
  methods: {
    updateValue: updateValue,
    addLeg() {
      this.$emit('update', this.details)
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
        if (val === '' || val === '--Select a Market--') {
          this.isValidMarket = false
        } else {
          this.isValidMarket = true
        }
      },
      deep: true,
    },
    'details.subject': {
      handler(val) {
        if (val === '') {
          this.isValidSubject = false
        } else {
          this.isValidSubject = true
        }
      },
      deep: true,
    },
    'details.over': {
      handler(val) {
        if (val === '--O/U/N--' || val === '') {
          this.isValidOU = false
        } else {
          this.isValidOU = true
        }
      },
      deep: true,
    },
    'details.line': {
      handler(val) {
        if (!this.isOverOrUnder) {
          this.isValidLine = false
        } else {
          if (val === '' || val < 0) {
            this.isValidLine = false
          } else {
            this.isValidLine = true
          }
        }
      },
      deep: true,
    },
    'details.prop': {
      handler(val) {
        if (val === '') {
          this.isValidProp = false
        } else {
          this.isValidProp = true
        }
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
.add-leg-btn:hover {
  cursor: pointer;
}
.add-leg-btn:active {
  transform: translate(0, 2px);
}
</style>
