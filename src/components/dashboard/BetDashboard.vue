<template>
  <div>
    <h2>View Bets</h2>
    <div class="bet-dashboard-wrap">
      <BetFilter @update="filterBets($event)" />
      <div class="bet-wrap">
        <BetItem
          v-for="bet in filteredBets"
          :key="bet._id"
          :bet="bet"
        />
      </div>
    </div>
  </div>
</template>
<script>
import BetFilter from '@/components/dashboard/BetFilter.vue'
import BetItem from '@/components/dashboard/BetItem.vue'
export default {
  name: 'BetDashboard',
  data() {
    return {
      filter: '',
      filterOptions: [],
    }
  },
  components: {
    BetFilter,
    BetItem,
  },
  props: ['bets'],
  computed: {
    filteredBets() {
      let filteredBets = this.bets

      switch (this.filter) {
        case 'all':
          filteredBets = this.bets
          break
        case 'open':
          filteredBets = this.bets.filter(bet => bet.settled === false)
          break
        case 'settled':
          filteredBets = this.bets.filter(bet => bet.settled === true)
          break
        case 'won':
          filteredBets = this.bets.filter(bet => bet.settled === true && bet.won === true)
          break
        case 'lost':
          filteredBets = this.bets.filter(bet => bet.settled === true && bet.won === false)
          break
        default:
          filteredBets = this.bets
          break
      }

      this.filterOptions.forEach(option => {
        filteredBets = filteredBets.filter(bet => bet[option] === true)
      })

      return filteredBets
    },
  },
  methods: {
    filterBets({ filter, filterOptions }) {
      this.filter = filter
      this.filterOptions = filterOptions
    },
  },
}
</script>
<style scoped>
.bet-dashboard-wrap {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 5px;
}
h2 {
  text-align: center;
}
</style>
