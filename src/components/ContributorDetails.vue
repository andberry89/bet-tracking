<template>
  <div
    v-if="contributor.sports"
    class="page-header"
  >
    <div class="img-wrap">
      <img :src="contributor.imageUrl" />
      <div class="item-name">{{ contributor.name }}</div>
    </div>
    <div class="contributor-sports">{{ contributor.sports.join(', ') }}</div>
  </div>
</template>
<script>
export default {
  name: 'ContributorDetails',
  props: {
    contributor: {
      type: Object,
    },
  },
}
</script>
<style scoped>
.contributor-sports {
  font: 400 20px/1.2 'Helvetica', 'Arial', sans-serif;
  color: #333;
}
</style>
