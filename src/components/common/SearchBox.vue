<template>
  <div class="player-list-wrapper">
    <div class="icon input">
      <input
        type="text"
        placeholder="Search..."
        v-model="searchVal"
      />
    </div>
    <ul v-if="searchedPlayers.length">
      <li
        class="player-card"
        v-for="player in searchedPlayers"
        :key="player.id"
        @click="selectPlayer(player)"
      >
        <div class="player-headshot">
          <img
            v-if="player.headshot"
            :src="player.headshot.href"
            :alt="player.headshot.alt"
            width="40"
            height="40"
          />
        </div>
        <div class="player-name">{{ player.displayName }} ({{ player.team.abbreviation }})</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SearchBox',
  data() {
    return {
      searchVal: '',
    }
  },
  props: {
    playerList: {
      type: Array,
      required: true,
    },
  },
  computed: {
    searchedPlayers() {
      if (this.searchVal === '') {
        return []
      }

      let matches = 0

      return this.playerList.filter(player => {
        if (player.displayName.toLowerCase().includes(this.searchVal.toLowerCase()) && matches < 10) {
          matches++
          return player
        }
      })
    },
  },
  methods: {
    selectPlayer(player) {
      this.searchVal = ''
      this.$emit('update', player)
    },
  },
}
</script>
<style scoped>
.player-card {
  display: flex;
  flex-flow: row nowrap;
}
</style>
