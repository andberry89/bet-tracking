<template>
  <div class="grid-wrap">
    <div
      class="grid-item"
      v-for="sheet in sheets"
      :key="sheet.id"
    >
      <img :src="sheet.imageName" />
      <h3 class="item-name">{{ sheet.name }}</h3>
      <router-link :to="'/sheets/' + sheet.id">
        <button>View Performance</button>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SheetsList',
  props: ['sheets'],
}
</script>
