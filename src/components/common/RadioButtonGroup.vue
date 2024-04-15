<template>
  <div class="radio-button-group">
    <div class="group-label">{{ this.label }}</div>
    <RadioButton
      v-for="option in options"
      :option="option"
      :key="option"
      :name="name"
      :defaultChoice="defaultChoice"
    />
  </div>
</template>
<script>
import RadioButton from './RadioButton.vue'

export default {
  name: 'RadioButtonGroup',
  components: {
    RadioButton,
  },
  props: {
    defaultChoice: {
      type: String,
      required: false,
    },
    label: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
  },
}
</script>
<style scoped>
.radio-button-group {
  font-size: 12px;
}
.group-label {
  background-color: var(--green);
  padding: 1px 3px;
}
</style>
