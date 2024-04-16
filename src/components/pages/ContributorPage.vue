<template>
  <div v-if="contributor">
    <ContributorDetails :contributor="contributor" />
  </div>
  <div v-else>
    <PageNotFound />
  </div>
</template>

<script>
import PageNotFound from './PageNotFound.vue'
import ContributorDetails from '@/components/contributors/ContributorDetails.vue'
import axios from 'axios'

export default {
  name: 'ContributorPage',
  data() {
    return {
      contributor: {
        type: Object,
        default: null,
      },
    }
  },
  async created() {
    const response = await axios.get(`/api/contributors/${this.$route.params.contributorId}`)
    const data = response.data
    this.contributor = data
  },
  components: {
    PageNotFound,
    ContributorDetails,
  },
}
</script>
