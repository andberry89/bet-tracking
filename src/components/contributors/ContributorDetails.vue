<template>
  <div
    v-if="contributor.sports"
    class="page-header"
  >
    <div class="logo-wrap">
      <img
        :src="contributor.imageUrl"
        height="85"
        width="85"
      />
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
.logo-wrap img {
  border-radius: 50%;
}
</style>
