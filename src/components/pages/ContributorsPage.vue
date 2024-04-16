<template>
  <h1>Contributors</h1>
  <ContributorsList
    :contributors="contributors"
    path="contributors"
    size="large"
  />
</template>

<script>
import ContributorsList from '@/components/contributors/ContributorsList.vue'
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
