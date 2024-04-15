<template>
  <div class="input-wrap">
    <label
      :for="forVal"
      v-if="label"
      >{{ this.label }}</label
    >
    <input
      type="Number"
      :placeholder="placeholder"
      :for="forVal"
      :name="forVal"
      :step="step"
      :min="min"
      :value="value"
      :disabled="disabled"
      @keyup="emitVal($event.target.value)"
      @keydown="emitVal($event.target.value)"
      @change="emitVal($event.target.value)"
    />
  </div>
</template>
<script>
export default {
  name: 'InputText',
  props: {
    disabled: {
      type: String,
      required: false,
    },
    label: {
      type: String,
      required: false,
    },
    min: {
      type: String,
      required: false,
      default: '-100000',
    },
    placeholder: {
      type: String,
      default: '',
    },
    step: {
      type: String,
      required: false,
      default: '0.5',
    },
    value: {
      type: String,
      default: null,
    },
  },
  computed: {
    forVal() {
      return this.placeholder.toLowerCase()
    },
  },
  methods: {
    emitVal(val) {
      this.$emit('update', val)
    },
  },
}
</script>
<style scoped>
.input-wrap {
  background-color: var(--white);
  display: flex;
  flex-direction: column;
}
label {
  display: block;
  font-size: 12px;
  background-color: var(--green);
  padding: 1px 3px;
}
input {
  width: 100%;
  border: none;
  height: 100%;
}
input:disabled {
  background-color: var(--dark-gray);
}
</style>
