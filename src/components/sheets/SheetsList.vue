<template>
  <div class="grid-wrap">
    <div
      id="add-sheet"
      :class="gridSize"
      v-if="isDashboard"
    >
      <img src="@/assets/icons/plus.png" />
      <router-link :to="formattedPath + 'add-new-sheet'">
        <button>Add New Sheet</button>
      </router-link>
    </div>
    <div
      :class="gridSize"
      v-for="sheet in sheets"
      :key="sheet._id"
    >
      <img :src="sheet.imageUrl" />
      <h3
        v-if="!isDashboard"
        class="item-name"
      >
        {{ sheet.name }}
      </h3>
      <router-link :to="'/sheets/' + sheet._id">
        <button>{{ isDashboard ? sheet.name : 'View Performance' }}</button>
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
    path: {
      type: String,
      required: false,
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
    formattedPath() {
      return `/${this.path}/`
    },
    isDashboard() {
      return this.path === 'dashboard' ? true : false
    },
  },
}
</script>
