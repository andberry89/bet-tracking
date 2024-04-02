<template>
  <div class="page-header">
    <div class="img-wrap">
      <img :src="capper.imageName" />
      <div class="item-name">{{ capper.name }}</div>
    </div>
    <div class="capper-sports">{{ capper.sports.join(', ') }}</div>
  </div>
</template>
<script>
export default {
  name: 'CapperDetails',
  props: {
    capper: {
      type: Object,
    },
  },
}
</script>
<style scoped>
.capper-sports {
  font: 400 20px/1.2 'Helvetica', 'Arial', sans-serif;
  color: #333;
}
</style>
