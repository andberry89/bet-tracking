<template>
  <div class="grid-wrap">
    <div
      id="add-contributor"
      :class="gridSize"
      v-if="isDashboard"
    >
      <img src="@/assets/icons/plus.png" />
      <router-link :to="formattedPath + 'add-new-contributor'">
        <button>Add New Contributor</button>
      </router-link>
    </div>
    <div
      :class="gridSize"
      v-for="contributor in contributors"
      :key="contributor.id"
    >
      <img :src="contributor.imageUrl" />
      <h3
        v-if="!isDashboard"
        class="item-name"
      >
        {{ contributor.name }}
      </h3>
      <span
        v-if="!isDashboard"
        class="specialities"
        ><em>{{ contributor.sports.join(', ') }}</em></span
      >
      <router-link :to="formattedPath + contributor._id">
        <button>{{ isDashboard ? contributor.name : 'View Performance' }}</button>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ContributorsList',
  props: {
    contributors: {
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
      required: true,
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
<style scoped>
img {
  border-radius: 50%;
}
.specialities {
  font: 400 14px/1.2 'Helvetica', sans-serif;
  margin: 2px 0;
}
#add-contributor {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
</style>
