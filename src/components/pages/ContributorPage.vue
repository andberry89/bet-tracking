<template>
  <div
    class="contributor-page-wrap"
    v-if="contributor"
  >
    <ContributorDetails
      class="contributor-details"
      :contributor="contributor"
      :bets="bets"
    />
    <BetDashboard
      class="bet-dashboard"
      :bets="bets"
    />
  </div>
  <div v-else>
    <PageNotFound />
  </div>
</template>

<script>
import BetDashboard from '@/components/dashboard/BetDashboard.vue'
import ContributorDetails from '@/components/contributors/ContributorDetails.vue'
import PageNotFound from './PageNotFound.vue'
import axios from 'axios'
import sortBets from '@/utils/sortBets'

export default {
  name: 'ContributorPage',
  data() {
    return {
      bets: [],
      contributor: {
        type: Object,
        default: null,
      },
    }
  },
  components: {
    BetDashboard,
    ContributorDetails,
    PageNotFound,
  },
  methods: {
    sortBets: sortBets,
  },
  async created() {
    const id = this.$route.params.contributorId
    const conRes = await axios.get(`/api/contributors/${id}`)
    const conData = conRes.data
    this.contributor = conData
    const betRes = await axios.get(`/api/dashboard/${id}`)
    let bets = betRes.data
    bets = sortBets(bets)
    this.bets = bets
  },
}
</script>
<style scoped>
.bet-dashboard {
  max-height: 70vh;
  overflow-y: auto;
  padding: 0 10px 0 0;
}
</style>
