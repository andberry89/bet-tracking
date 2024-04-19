<template>
  <div v-if="contributor">
    <ContributorBets :contributor="contributor" />
    <BetDashboard :bets="this.bets" />
  </div>
  <div v-else>
    <PageNotFound />
  </div>
</template>

<script>
import BetDashboard from '@/components/dashboard/BetDashboard'
import ContributorBets from '@/components/contributors/ContributorBets.vue'
import PageNotFound from './PageNotFound.vue'
import axios from 'axios'

export default {
  name: 'ContributorDashboard',
  data() {
    return {
      contributor: {},
      bets: [],
    }
  },
  async created() {
    const contributorId = this.$route.params.contributorId
    const betResponse = await axios.get(`/api/dashboard/${contributorId}`)
    const contributorResponse = await axios.get(`/api/contributors/${contributorId}`)
    const bets = betResponse.data
    const contributor = contributorResponse.data
    this.contributor = contributor
    this.bets = bets
  },
  components: {
    BetDashboard,
    ContributorBets,
    PageNotFound,
  },
}
</script>
