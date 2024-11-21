<template>
  <div class="line">
    <!-- <input
      type="text"
      :value="details.player"
      :id="id + '-player'"
      @keyup="updateLine('player', $event.target.value)"
      @keydown="updateLine('player', $event.target.value)"
      @keychange="updateLine('player', $event.target.value)"
      placeholder="Player Name"
    /> -->
    <SearchBox
      :playerList="playerList"
      @update="updateLine('player', $event)"
    />
    <span>{{ this.details.player.displayName }}</span>
    <select
      name="over-under"
      :id="id + '-ou'"
      v-model="details.overUnder"
      @change="updateLine('overUnder', $event.target.value)"
    >
      <option value="over">Over</option>
      <option value="under">Under</option>
    </select>
    <input
      type="number"
      step="0.5"
      min="0.5"
      :value="details.line"
      :id="id + '-line'"
      @keyup="updateLine('line', $event.target.value)"
      @keydown="updateLine('line', $event.target.value)"
      @change="updateLine('line', $event.target.value)"
    />
    <input
      type="number"
      step="1"
      :value="details.odds"
      :id="id + '-odds'"
      @keyup="updateLine('odds', $event.target.value)"
      @keydown="updateLine('odds', $event.target.value)"
      @change="updateLine('odds', $event.target.value)"
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
        player: {
          type: Object,
        },
        overUnder: 'over',
        line: 0,
        odds: 0,
      },
      searchVal: '',
    }
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    playerList: {
      type: Array,
      required: true,
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
  grid-template-columns: auto auto max-content 75px 75px;
}
input[type='number'] {
  text-align: right;
}
</style>
