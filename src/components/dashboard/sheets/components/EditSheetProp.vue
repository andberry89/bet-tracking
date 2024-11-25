<template>
  <div class="sheet-props-wrap">
    <div class="prop-header">
      <span class="header-text">{{ this.name }}</span>
      <EditSheetPropLine
        v-for="(value, idx) in this.localProp.values"
        :key="value._id"
        :value="value"
        @update="updateProp(idx, $event)"
      />
    </div>
  </div>
</template>
<script>
import EditSheetPropLine from './EditSheetPropLine.vue'

export default {
  name: 'EditSheetLine',
  data() {
    return {
      localProp: {},
    }
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    prop: {
      type: Object,
      required: true,
    },
    values: {
      type: Array,
      required: true,
    },
  },
  components: {
    EditSheetPropLine,
  },
  methods: {
    updateProp(idx, value) {
      this.localProp.values[idx] = value
      this.$emit('update', this.localProp)
      // TODO: FINISH THIS LOGIC
    },
  },
  created() {
    this.localProp = this.prop
  },
}
</script>
<style scoped>
.sheet-props-wrap {
  border: 1px solid var(--white);
  border-radius: 8px;
  padding: 4px;
  margin: 10px 0;
}
.header-text {
  font-weight: 700;
  border-bottom: 2px solid var(--white);
  border-right: 2px solid var(--white);
  border-radius: 8px;
  padding: 5px;
  display: inline-block;
  margin-bottom: 5px;
}
</style>
