<template>
  <div
    v-if="contributor"
    class="wrap"
  >
    <h1>Bet Tracking for {{ contributor.name }}</h1>
    <BetInput />
  </div>
  <div v-else>
    <PageNotFound />
  </div>
</template>

<script>
import BetInput from '@/components/dashboard/BetInput.vue'
import PageNotFound from './PageNotFound.vue'
import axios from 'axios'

export default {
  name: 'ContributorDashboard',
  data() {
    return {
      contributor: {},
    }
  },
  components: {
    BetInput,
    PageNotFound,
  },
  async created() {
    const contributorId = this.$route.params.contributorId
    const contributorResponse = await axios.get(`/api/contributors/${contributorId}`)
    const contributor = contributorResponse.data
    this.contributor = contributor
  },
}
</script>
