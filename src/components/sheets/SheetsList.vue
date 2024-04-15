<template>
  <div class="grid-wrap">
    <div
      :class="gridSize"
      v-for="sheet in sheets"
      :key="sheet._id"
    >
      <img :src="sheet.imageUrl" />
      <h3 class="item-name">{{ sheet.name }}</h3>
      <router-link :to="'/sheets/' + sheet._id">
        <button>View Performance</button>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SheetsList',
  props: {
    sheets: {
      type: Array,
      required: true,
    },
    size: {
      type: String,
      required: false,
      default: 'large',
    },
  },
  computed: {
    gridSize() {
      if (this.size === 'small') {
        return 'small-grid-item'
      } else {
        return 'large-grid-item'
      }
    },
  },
}
</script>
