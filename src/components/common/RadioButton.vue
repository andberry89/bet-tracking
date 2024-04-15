<template>
  <p>
    <label :for="option">
      <input
        type="radio"
        :name="name"
        :value="option"
        :id="option"
        :checked="isDefault"
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
    isDefault() {
      return this.defaultChoice === this.option
    },
  },
}
</script>
<style scoped>
p {
  margin: 0;
}
</style>
