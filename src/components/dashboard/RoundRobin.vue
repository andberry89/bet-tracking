<template>
  <div class="round-robin-wrap">
    <h4>Round Robin</h4>
    <div
      v-for="(option, idx) in options"
      :key="option.choose"
      class="round-robin-option"
    >
      <div>{{ option.choose }} Pick Round Robin:</div>
      <div>
        {{ option.combos }} x
        <input
          type="number"
          placeholder="Risk"
          :value="this.temp[idx]"
          @keyup="updateArray(option, $event.target.value)"
          @keydown="updateArray(option, $event.target.value)"
          @change="updateArray(option, $event.target.value)"
        />
        units
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RoundRobin',
  data() {
    return {
      rr: [],
      temp: [],
    }
  },
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  methods: {
    emitVal(val) {
      this.$emit('update', val)
    },
    updateArray(option, val) {
      let wager = parseFloat(val) * option.combos
      if (!wager) {
        wager = 0
      }

      // find index where 'choose': option.choose
      // update array
      const idx = this.rr.findIndex(e => e.choose === option.choose)
      this.rr[idx] = {
        ...this.rr[idx],

        wager: wager,
      }
      console.log(this.rr) // TODO: DELETE
      this.emitVal(this.rr)
    },
  },
  watch: {
    options: {
      handler(newVal, oldVal) {
        console.log('New: ' + newVal)
        console.log('Old: ' + oldVal)
      },
    },
  },
  // TODO: Created won't work here, doesn't work as legs are added
  // Need a different way of figuring this out...
  // Maybe a watch?
  created() {
    console.log(this.options.length)
    this.options.forEach(option => {
      this.rr.push({
        choose: option.choose,
        combos: option.combos,
        wager: 0,
      })
    })
  },
}
</script>
<style scoped>
.round-robin-wrap {
  width: 30%;
}
.round-robin-option {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}
</style>
