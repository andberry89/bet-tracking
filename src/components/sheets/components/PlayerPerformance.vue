<template>
  <div class="container">
    <div class="sort-container">
      <SelectComponent
        id="sort-players"
        label="Sort Players"
        name="Sort Players"
        :options="sortOptions"
        class="select-box"
        @update="updatePlayers($event)"
      />
    </div>
    <div
      class="categories-wrap"
      v-if="activeSection === 'categories'"
    >
      <PlayerPerformanceCard
        v-for="(category, idx) in categories"
        :key="idx"
        :category="category"
      />
    </div>
    <div
      class="all-players-wrap"
      v-if="activeSection === 'all'"
    >
      <PlayerPerformanceCard :category="allPlayers" />
    </div>
  </div>
</template>
<script>
import PlayerPerformanceCard from './PlayerPerformanceCard.vue'
import { calcPlayers } from '../utils/calcPlayers'
import { sortOptions } from '@/utils/selectOptions'
import sortPlayers from '../utils/sortPlayers'

export default {
  name: 'PlayerPerformance',
  data() {
    return {
      activeSection: 'all',
      allPlayers: {
        type: Object,
      },
      categories: [],
      sortOptions: sortOptions,
      defaultPlayers: [],
    }
  },
  props: {
    players: {
      type: Array,
      required: true,
    },
  },
  components: {
    PlayerPerformanceCard,
  },
  methods: {
    calcPlayers: calcPlayers,
    sortPlayers: sortPlayers,
    updatePlayers(option) {
      this.allPlayers.players = sortPlayers(option, this.defaultPlayers)
    },
    updateSection(value) {
      this.activeSection = value
    },
  },
  created() {
    let copyPlayers = this.players
    copyPlayers.sort((a, b) => {
      let x = a.displayName.toLowerCase()
      let y = b.displayName.toLowerCase()

      if (x > y) return 1
      if (x < y) return -1
      return 0
    })

    this.allPlayers = {
      header: 'All Players',
      description: '',
      players: copyPlayers,
    }

    this.defaultPlayers = copyPlayers

    this.categories = calcPlayers(copyPlayers)
  },
}
</script>
<style scoped>
.select-box {
  width: 175px;
}
</style>
