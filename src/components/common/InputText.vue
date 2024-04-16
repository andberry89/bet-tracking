<template>
  <div class="input-wrap">
    <label
      v-if="label"
      :for="forVal"
      >{{ this.label }}</label
    >
    <input
      type="text"
      :id="forVal"
      :placeholder="placeholder"
      :for="forVal"
      :name="forVal"
      :value="value"
      :disabled="disabled"
      @keyup="$emit('update', $event.target.value)"
      @keydown="$emit('update', $event.target.value)"
      @change="$emit('update', $event.target.value)"
    />
  </div>
</template>
<script>
export default {
  name: 'InputText',
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    label: {
      type: String,
      required: false,
      default: null,
    },
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    forVal() {
      return this.placeholder.toLowerCase()
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
</style>
