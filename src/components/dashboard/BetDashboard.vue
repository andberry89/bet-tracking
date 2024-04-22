<template>
  <div class="bet-dashboard-wrap">
    <BetFilter
      class="bet-filter"
      @update="filterBets($event)"
    />
    <div class="bet-wrap">
      <BetItem
        v-for="bet in filteredBets"
        :key="bet._id"
        :bet="bet"
      />
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
    }
  },
  components: {
    BetFilter,
    BetItem,
  },
  props: ['bets'],
  computed: {
    filteredBets() {
      switch (this.filter) {
        case 'all':
          return this.bets
        case 'settled':
          return this.bets.filter(bet => bet.settled === true)
        case 'won':
          return this.bets.filter(bet => bet.settled === true && bet.won === true)
        case 'lost':
          return this.bets.filter(bet => bet.settled === true && bet.won === false)
        default:
          return this.bets
      }
    },
  },
  methods: {
    filterBets(filter) {
      this.filter = filter
    },
  },
}
</script>
<style scoped>
.bet-dashboard-wrap {
  display: flex;
  flex-flow: row nowrap;
}
</style>
