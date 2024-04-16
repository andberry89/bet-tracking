<template>
  <div class="leg-details-wrap">
    <div
      v-for="(leg, index) in legs"
      :key="index"
      class="added-leg"
    >
      <div class="leg-item">Leg #{{ index + 1 }}</div>
      <div class="leg-item">{{ leg.market }}</div>
      <div class="leg-item">{{ leg.subject }}</div>
      <div class="leg-item">{{ leg.over }}</div>
      <div class="leg-item">{{ leg.line }}</div>
      <div class="leg-item">{{ leg.prop }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LegDetails',
  props: ['legs'],
}
</script>
<style scoped>
.leg-details-wrap {
  background-color: rgba(250, 250, 250, 0.2);
  color: var(--white);
  border: 2px dashed var(--green);
  border-radius: 8px;
  padding: 0 5px;
  margin-top: 5px;
}
.added-leg {
  display: grid;
  grid-template-columns: 90px 2fr 2fr 90px 1fr 2fr 35px;
  column-gap: 5px;
  place-items: start;
  border-bottom: 1px solid var(--white);
  padding: 2px;
}
.added-leg:last-child {
  border-bottom: none;
}
.leg-item {
  padding: 5px 10px;
}
</style>
