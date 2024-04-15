<template>
  <div class="date-wrap">
    <label
      v-if="label"
      for="name"
      >{{ this.label }}</label
    >
    <input
      type="date"
      :for="name"
      :name="name"
      :id="name"
      @change="$emit('update', $event.target.value)"
    />
  </div>
</template>
<script>
export default {
  name: 'InputDate',
  props: {
    label: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
  },
}
</script>
<style scoped>
.date-wrap {
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
  border: none;
  height: 100%;
}
</style>
