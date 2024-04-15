<template>
  <div class="grid-wrap">
    <div
      class="grid-item"
      v-for="contributor in contributors"
      :key="contributor.id"
    >
      <img :src="contributor.imageUrl" />
      <h3 class="item-name">{{ contributor.name }}</h3>
      <span class="specialities"
        ><em>{{ contributor.sports.join(', ') }}</em></span
      >
      <router-link :to="'/contributors/' + contributor._id">
        <button>View Performance</button>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ContributorsList',
  props: ['contributors'],
}
</script>
<style scoped>
img {
  border-radius: 50%;
}
.specialities {
  font: 400 14px/1.2 'Helvetica', sans-serif;
  margin: 2px 0;
}
</style>
