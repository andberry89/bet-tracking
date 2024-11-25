<template>
  <div class="line">
    <SearchBox
      :playerList="playerList"
      @update="updateLine('player', $event)"
      class="searchbox"
      v-if="this.details.player.name === ''"
    />
    <div
      v-else
      class="clear-btn-wrap"
    >
      <button
        class="clear-btn"
        @click="clearPlayer"
      >
        X
      </button>
    </div>
    <span class="selected-player">{{
      this.details.player ? this.details.player.displayName : 'No player selected'
    }}</span>
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
          name: '',
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
    clearPlayer() {
      this.details.player = { name: '' }
    },
    updateLine(detail, value) {
      if (detail === 'line' || detail === 'odds') {
        value = parseFloat(value)
      }
      updateValue(this.details, detail, value)
      this.$emit('update', this.details)
    },
  },
  created() {
    console.log(this.details.player.name === '')
  },
}
</script>
<style scoped>
.line {
  display: grid;
  grid-template-columns: 130px auto max-content 75px 75px;
}
.clear-btn-wrap {
  text-align: right;
}
.clear-btn {
  margin: 2px;
  padding: 2px 4px;
  background-color: var(--red);
  color: var(--white);
  font-weight: 700;
  font-size: 12px;
}
.clear-btn:hover {
  cursor: pointer;
  background-color: var(--translucent-red);
}
.selected-player {
  border: 1px solid var(--green);
  background-color: var(--light-gray);
  margin: 0 2px;
  padding: 0 2px;
  font-size: 14px;
}
input[type='number'] {
  text-align: right;
}
</style>
