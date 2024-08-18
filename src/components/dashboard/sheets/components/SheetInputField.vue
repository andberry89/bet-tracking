<template>
  <div class="individual-sheet">
    <div class="individual-sheet-header">
      <h3>{{ header }}</h3>
    </div>
    <SheetInputFieldLine
      v-for="i in 5"
      :key="formattedHeader + '-' + i"
      :id="formattedHeader + '-' + i"
      @update="addLine(i - 1, $event)"
    />
  </div>
</template>
<script>
import SheetInputFieldLine from './SheetInputFieldLine.vue'
export default {
  name: 'SheetInputField',
  data() {
    return {
      lines: [],
    }
  },
  components: {
    SheetInputFieldLine,
  },
  props: {
    header: {
      type: String,
      required: true,
    },
  },
  computed: {
    formattedHeader() {
      return this.header.split(' ').join('-')
    },
  },
  methods: {
    addLine(idx, details) {
      this.lines[idx] = details
      this.$emit('update', this.lines)
    },
  },
}
</script>
<style scoped>
.individual-sheet {
  border: 1px solid var(--white);
  border-radius: 8px;
  overflow: hidden;
}
.individual-sheet div {
  padding: 8px 16px;
}
.individual-sheet-header {
  background-color: var(--green);
}
h3 {
  margin: 0;
}
</style>
