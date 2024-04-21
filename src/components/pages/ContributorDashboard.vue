<template>
  <div v-if="contributor">
    <ContributorBets :contributor="contributor" />
    <BetDashboard />
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
    }
  },
  async created() {
    const contributorId = this.$route.params.contributorId
    const contributorResponse = await axios.get(`/api/contributors/${contributorId}`)
    const contributor = contributorResponse.data
    this.contributor = contributor
  },
  components: {
    BetDashboard,
    ContributorBets,
    PageNotFound,
  },
}
</script>
