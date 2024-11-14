<template>
  <div class="line">
    <input
      type="text"
      :value="details.player"
      :id="id + '-player'"
      @keyup="updateLine('player', $event.target.value)"
      @keydown="updateLine('player', $event.target.value)"
      @keychange="updateLine('player', $event.target.value)"
      placeholder="Player Name"
    />
    <select
      name="over-under"
      :id="id + '-ou'"
      v-model="details.overUnder"
      @change="updateLine('overUnder', $event.target.value)"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.value }}
      </option>
    </select>
    <input
      type="number"
      step="0.5"
      min="0.5"
      :value="details.line"
      :id="id + '-line'"
      :disabled="!isOverUnder"
      @keyup="updateLine('line', $event.target.value)"
      @keydown="updateLine('line', $event.target.value)"
      @change="updateLine('line', $event.target.value)"
    />
    <input
      type="text"
      :value="details.prop"
      :id="id + '-prop'"
      @keyup="updateLine('prop', $event.target.value)"
      @keydown="updateLine('prop', $event.target.value)"
      @change="updateLine('prop', $event.target.value)"
    />
  </div>
</template>
<script>
import updateValue from '@/utils/updateValue'
import { starting5OverUnderOptions } from '@/utils/selectOptions'

export default {
  name: 'Starting5InputFieldLine',
  data() {
    return {
      details: {
        player: '',
        overUnder: '',
        line: 0,
        prop: '',
      },
      options: starting5OverUnderOptions,
    }
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    isOverUnder() {
      if (this.details.overUnder.toLowerCase() === 'over' || this.details.overUnder.toLowerCase() === 'under') {
        return true
      } else {
        return false
      }
    },
  },
  methods: {
    updateValue: updateValue,
    updateLine(detail, value) {
      if (detail === 'line' || detail === 'odds') {
        value = parseFloat(value)
      }
      updateValue(this.details, detail, value)
      this.$emit('update', this.details)
    },
  },
}
</script>
<style scoped>
.line {
  display: grid;
  grid-template-columns: auto max-content 75px 75px;
}
input[type='number'] {
  text-align: right;
}
</style>
