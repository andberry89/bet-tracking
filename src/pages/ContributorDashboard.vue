<template>
  <div v-if="contributor">
    <ContributorBets :contributor="contributor" />
  </div>
  <div v-else>
    <PageNotFound />
  </div>
</template>

<script>
import PageNotFound from './PageNotFound.vue'
import ContributorBets from '@/components/contributors/ContributorBets.vue'
import axios from 'axios'

export default {
  name: 'ContributorPage',
  data() {
    return {
      contributor: {},
    }
  },
  async created() {
    const response = await axios.get(`/api/contributors/${this.$route.params.contributorId}`)
    const data = response.data
    this.contributor = data
  },
  components: {
    PageNotFound,
    ContributorBets,
  },
}
</script>
