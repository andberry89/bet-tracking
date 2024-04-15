<template>
  <h1>Contributors</h1>
  <ContributorsList :contributors="contributors" />
</template>

<script>
import ContributorsList from '@/components/ContributorsList.vue'
import axios from 'axios'

export default {
  name: 'ContributorsPage',
  data() {
    return {
      contributors: [],
    }
  },
  async created() {
    const response = await axios.get('/api/contributors')
    const data = response.data
    this.contributors = data
  },
  components: {
    ContributorsList,
  },
}
</script>
