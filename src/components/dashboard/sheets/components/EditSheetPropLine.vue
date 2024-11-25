<template>
  <div class="edit-sheet-line">
    <span class="name-text">{{ this.localValue.player.displayName }}</span>
    <span class="ou-text">{{ this.localValue.overUnder }}</span>
    <span class="line-text">{{ this.localValue.line }}</span>
    <input
      type="number"
      placeholder="Result"
      step="1"
      @keyup="updateResult($event.target.value)"
      @keydown="updateResult($event.target.value)"
      @change="updateResult($event.target.value)"
    />
    <div class="void-wrap">
      <label :for="this.localValue._id">Void</label>
      <CheckboxInput
        :id="this.localValue._id"
        value="void"
        @update="updateVoid()"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'EditSheetPropLine',
  data() {
    return {
      isVoid: false,
      localValue: {},
    }
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  methods: {
    emitValue() {
      this.$emit('update', this.localValue)
    },
    updateResult(val) {
      this.localValue.result = parseInt(val)
      if (this.localValue.overUnder === 'over') {
        this.localValue.hit = this.localValue.result > this.localValue.line ? true : false
      } else {
        this.localValue.hit = this.localValue.result < this.localValue.line ? true : false
      }

      this.emitValue()
    },
    updateVoid() {
      this.localValue.void = !this.localValue.void
      this.emitValue()
    },
  },
  created() {
    this.localValue = this.value
  },
}
</script>
<style scoped>
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
  font-size: 12px;
}
input[type='number'] {
  width: 100px;
}
</style>
