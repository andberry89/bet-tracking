<template>
  <div class="individual-sheet">
    <div class="individual-sheet-header">
      <h3>Starting 5</h3>
    </div>
    <Starting5InputFieldLine
      v-for="i in 5"
      :key="'starting-5-' + i"
      :id="'starting-5-' + i"
      @update="addLine(i - 1, $event)"
    />
  </div>
</template>
<script>
export default {
  name: 'Starting5InputField',
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
