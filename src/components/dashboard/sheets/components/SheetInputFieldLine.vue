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
      v-model="details.ou"
      @change="updateLine('overUnder', $event.target.value)"
    >
      <option value="over">Over</option>
      <option value="under">Under</option>
    </select>
    <input
      type="number"
      step=".5"
      min="0.5"
      :value="details.line"
      :id="id + '-line'"
      @keyup="updateLine('line', $event.target.value)"
      @keydown="updateLine('line', $event.target.value)"
      @change="updateLine('line', $event.target.value)"
    />
  </div>
</template>
<script>
import updateValue from '@/utils/updateValue'
export default {
  name: 'SheetInputFieldLine',
  data() {
    return {
      details: {
        player: '',
        overUnder: 'over',
        line: 0,
      },
    }
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  methods: {
    updateValue: updateValue,
    updateLine(detail, value) {
      updateValue(this.details, detail, value)
      this.$emit('update', this.details)
    },
  },
}
</script>
<style scoped>
.line {
  display: grid;
  grid-template-columns: auto max-content 75px;
}
input[type='number'] {
  text-align: right;
}
</style>
