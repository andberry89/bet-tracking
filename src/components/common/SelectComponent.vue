<template>
  <div class="select-wrap">
    <label
      :for="id"
      v-if="label"
      >{{ this.label }}</label
    >
    <select
      :name="name"
      :id="id"
      @change="$emit('update', $event.target.value)"
    >
      <option
        v-for="option in options"
        :disabled="option.disabled"
        :key="option.value"
        :value="option.value"
      >
        {{ option.value }}
      </option>
    </select>
  </div>
</template>
<script>
export default {
  name: 'SelectComponent',
  data() {
    return {
      value: null,
    }
  },
  props: {
    id: String,
    label: {
      type: String,
      required: false,
    },
    name: String,
    options: {
      type: Array,
      required: true,
    },
  },
  computed: {},
}
</script>
<style scoped>
.select-wrap {
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
select {
  font-size: 14px;
  border: none;
  height: 100%;
}
select option:disabled,
select option:first-child {
  color: var(--green);
  background-color: var(--dark-gray);
}
select option {
  color: var(--white);
  background-color: var(--dark-gray);
}
select option:hover {
  background-color: var(--green);
}
</style>
