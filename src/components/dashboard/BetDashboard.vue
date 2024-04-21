<template>
  <!-- TODO BUILD A FILTER COMPONENT -->
  <div>
    <BetItem
      v-for="bet in bets"
      :key="bet._id"
      :bet="bet"
    />
  </div>
</template>
<script>
import axios from 'axios'
import BetItem from '@/components/dashboard/BetItem.vue'
export default {
  name: 'BetDashboard',
  data() {
    return {
      bets: [],
    }
  },
  components: {
    BetItem,
  },
  async created() {
    const contributorId = this.$route.params.contributorId
    const betResponse = await axios.get(`/api/dashboard/${contributorId}`)
    const bets = betResponse.data
    this.bets = bets
  },
}
</script>
