<template>
  <div class="edit-dashboard">
    <h2>Edit Bets</h2>
    <div class="bet-dashboard-wrap">
      <BetFilter @update="updateFilters($event)" />
      <div class="edit-bet-wrap">
        <EditBetItem
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
import EditBetItem from '@/components/dashboard/EditBetItem.vue'
import filterBets from '@/components/dashboard/utils/filterBets'

export default {
  name: 'EditBetDashboard',
  data() {
    return {
      filter: '',
      filterOptions: [],
    }
  },
  components: {
    BetFilter,
    EditBetItem,
  },
  props: ['bets'],
  computed: {
    filteredBets() {
      return filterBets(this.bets, this.filter, this.filterOptions)
    },
  },
}
</script>
<style scoped>
.edit-bet-wrap {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  gap: 10px;
}
</style>
