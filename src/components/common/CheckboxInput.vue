<template>
  <label
    :for="id"
    class="checkbox-control"
  >
    <input
      type="checkbox"
      name="checkbox"
      v-model="check"
      :value="value"
      :id="id"
      @change="emitValue"
    />
    <slot></slot>
  </label>
</template>
<script>
export default {
  name: 'CheckboxInput',
  data() {
    return {
      check: false,
    }
  },
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  methods: {
    emitValue() {
      this.$emit('update', this.check)
    },
  },
}
</script>
<style scoped>
.checkbox-control {
  font: inherit;
  font-size: 18px;
  display: grid;
  grid-template-columns: 1em auto;
  justify-items: start;
  gap: 0.5em;
  margin: 5px 0;
}
input[type='checkbox'] {
  -webkit-appearance: none;
  appearance: none;
  background-color: var(--dark-gray);
  margin: 0;
  font: inherit;
  color: currentColor;
  width: 1.25em;
  height: 1.25em;
  border: 0.15em solid var(--green);
  border-radius: 0.15em;
  transform: translateY(-0.075em);
  display: grid;
  place-content: center;
}
input[type='checkbox']::before {
  content: '';
  width: 0.65em;
  height: 0.65em;
  transform: scale(0);
  transition: 100ms transform ease-in-out;
  box-shadow: inset 1em 1em var(--orange);
  background-color: var(--orange);
  transform-origin: bottom left;
  clip-path: polygon(26% 63%, 100% 0%, 30% 100%, 0 44%);
}
input[type='checkbox']:checked::before {
  transform: scale(1);
}
input[type='checkbox']:focus {
  outline: max(2px, 0.15em) solid currentColor;
  outline-offset: max(2px, 0.15em);
}
</style>
