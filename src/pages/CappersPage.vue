<template>
  <h1>Cappers</h1>
  <div class="grid-wrap">
    <div
      class="product-item"
      v-for="capper in cappers"
      :key="capper.id"
    >
      <img :src="capper.imageName" />
      <h3 class="product-name">{{ capper.name }}</h3>
      Specialities: {{ capper.sports.join(', ') }}
      <button>View Performance</button>
    </div>
  </div>
</template>

<script>
import { cappers } from '../temp-data.js'
export default {
  name: 'CappersPage',
  data() {
    return {
      cappers,
    }
  },
}
</script>
