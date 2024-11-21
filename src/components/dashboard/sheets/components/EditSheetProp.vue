<template>
  <div class="sheet-props-wrap">
    <div class="prop-header">
      <span class="header-text">{{ this.name }}</span>
      <div
        v-for="(player, idx) in this.values"
        :key="player._id"
        class="edit-sheet-line"
      >
        <span class="name-text">{{ player.player.displayName }}</span>
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
        <div class="void-wrap">
          <label :for="player + '-' + prop">Void?</label>
          <input
            type="checkbox"
            :id="player + '-' + prop"
            :name="player + '-' + prop"
            value="void"
            v-model="isVoid"
            @click="updateVoid(index, idx)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'EditSheetLine',
  props: {
    name: {
      type: String,
      required: true,
    },
    prop: {
      type: Object,
      required: true,
    },
    values: {
      type: Array,
      required: true,
    },
  },
  methods: {
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
    updateVoid(index, idx) {
      console.log(this.isVoid)
      this.details.props[index].values[idx].void = this.isVoid
    },
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
</style>
