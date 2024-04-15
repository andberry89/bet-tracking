<template>
  <div
    class="wrap"
    v-if="contributor"
  >
    <h1>Bet Tracking for {{ contributor.name }}</h1>
    <BetInput />

    [[ Bet View -- need filter ]]
  </div>
</template>

<script>
import axios from 'axios'
import BetInput from './BetInput.vue'

export default {
  name: 'ContributorBets',
  data() {
    return {
      bets: [],
      contributorId: 0,
      payout: 0,
      legs: 0,
      odds: 0,
    }
  },
  computed: {
    totalPayout() {
      return this.payout
    },
    betType() {
      if (this.legs < 1) {
        return 'Bet Type'
      } else if (this.legs === 1) {
        return 'Straight'
      } else {
        if (this.odds > 149) {
          return 'Parlay'
        } else {
          return 'Builder'
        }
      }
    },
  },
  props: {
    contributor: {
      type: Object,
    },
  },
  async created() {
    this.contributorId = this.$route.params.contributorId
    const response = await axios.get(`/api/dashboard/${this.contributorId}`)
    const data = response.data
    this.bets = data
  },
  components: { BetInput },
}
</script>
