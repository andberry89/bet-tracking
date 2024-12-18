<template>
  <div class="player-performance-card">
    <ModalOverlay
      :showModal="show"
      @click="close"
    >
      <ModalPlayerCard :player="activePlayer" />
    </ModalOverlay>
    <h3>{{ category.header }}</h3>
    <span class="description">{{ category.description }}</span>
    <div class="player-performance-wrap">
      <PlayerCard
        v-for="player in category.players"
        :key="player.id + '-header'"
        :player="player"
        @click="viewPlayerCard(player.id)"
      />
    </div>
  </div>
</template>
<script>
import PlayerCard from './PlayerCard.vue'
import ModalPlayerCard from './ModalPlayerCard.vue'

export default {
  name: 'PlayerPerformanceCard',
  data() {
    return {
      activePlayer: {
        type: Object,
      },
      show: false,
    }
  },
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
  components: {
    ModalPlayerCard,
    PlayerCard,
  },
  methods: {
    close() {
      this.show = false
    },
    viewPlayerCard(id) {
      this.activePlayer = this.category.players.find(e => e.id === id)
      this.show = true
    },
  },
}
</script>
<style scoped>
h3 {
  margin: 10px 0 0 0;
}
.player-performance-wrap {
  display: flex;
  flex-flow: row wrap;
  gap: 15px;
}
.player-card {
  width: 24%;
}
</style>
