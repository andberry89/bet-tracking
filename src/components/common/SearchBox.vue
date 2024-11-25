<template>
  <div class="player-list-wrapper">
    <input
      type="text"
      placeholder="Search..."
      v-model="searchVal"
    />
    <ul v-if="searchedPlayers.length">
      <li
        class="player-card"
        v-for="player in searchedPlayers"
        :key="player.id"
        @click="selectPlayer(player)"
      >
        {{ player.displayName }} ({{ player.team.abbreviation }})
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
.player-list-wrapper {
  position: relative;
  text-align: left;
}
input {
  width: 125px;
}
ul {
  margin: 0;
  padding: 0;
  position: absolute;
  z-index: 99;
  list-style-type: none;
}
li {
  background-color: var(--light-gray);
  font-size: 14px;
  text-align: left;
  padding: 2px 5px;
}
li:hover {
  cursor: pointer;
  background-color: var(--green);
}
</style>
