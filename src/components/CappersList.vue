<template>
  <div class="grid-wrap">
    <div
      class="grid-item"
      v-for="capper in cappers"
      :key="capper.id"
    >
      <img :src="capper.imageName" />
      <h3 class="item-name">{{ capper.name }}</h3>
      <span class="specialities"
        ><em>{{ capper.sports.join(', ') }}</em></span
      >
      <router-link :to="'/cappers/' + capper.id">
        <button>View Performance</button>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CappersList',
  props: ['cappers'],
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
