<template>
  <p>
    <label :for="thisId">
      <input
        type="radio"
        :name="name"
        :value="option"
        :id="thisId"
        :checked="isDefault"
        :disabled="disabled"
        @change="$parent.$emit('update', option)"
      />
      {{ option }}
    </label>
  </p>
</template>
<script>
export default {
  name: 'RadioButton',
  props: {
    defaultChoice: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
    option: {
      type: String,
      required: true,
    },
    radioValue: String,
  },
  computed: {
    thisId() {
      return this.name + '-' + this.option
    },
    isDefault() {
      return this.defaultChoice === this.option
    },
  },
}
</script>
<style scoped>
p {
  background-color: var(--white);
  color: var(--black);
  margin: 0;
  text-align: left;
}
</style>
