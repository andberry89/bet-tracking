<template>
  <div>
    <h2>View Bets</h2>
    <div class="bet-dashboard-wrap">
      <BetFilter @update="updateFilters($event)" />
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
import filterBets from '@/components/dashboard/utils/filterBets'
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
      return filterBets(this.bets, this.filter, this.filterOptions)
    },
  },
  methods: {
    filterBets: filterBets,
    updateFilters({ filter, filterOptions }) {
      this.filter = filter
      this.filterOptions = filterOptions
    },
  },
}
</script>
