<template>
  <div
    v-if="contributor"
    class="wrap"
  >
    <div class="header">
      <h1>{{ contributor.name }} -- Dashboard</h1>
      <div class="view-btns">
        <button
          :class="view === 'input' ? 'active' : ''"
          @click="updateView('input')"
        >
          Input Bet
        </button>
        <button
          :class="view === 'edit' ? 'active' : ''"
          @click="updateView('edit')"
        >
          Edit Bets
        </button>
        <button
          :class="view === 'view' ? 'active' : ''"
          @click="updateView('view')"
        >
          View Bets
        </button>
      </div>
    </div>
    <BetInput
      v-if="view === 'input'"
      @update="addBet($event)"
    />
    <EditBetDashboard
      v-if="view === 'edit'"
      :bets="this.bets"
    />
    <BetDashboard
      v-if="view === 'view'"
      :bets="this.bets"
    />
  </div>
  <div v-else>
    <PageNotFound />
  </div>
</template>

<script>
import BetDashboard from '@/components/dashboard/BetDashboard.vue'
import BetInput from '@/components/dashboard/BetInput.vue'
import EditBetDashboard from '@/components/dashboard/EditBetDashboard.vue'
import PageNotFound from './PageNotFound.vue'
import axios from 'axios'
import sortBets from '@/utils/sortBets'
import '../dashboard/styles/dashboard.css'

export default {
  name: 'ContributorDashboard',
  data() {
    return {
      bets: [],
      contributor: {},
      view: 'input',
    }
  },
  components: {
    BetDashboard,
    BetInput,
    EditBetDashboard,
    PageNotFound,
  },
  methods: {
    sortBets: sortBets,
    addBet(newBet) {
      this.bets.push(newBet)
      this.bets = sortBets(this.bets)
    },
    updateView(view) {
      this.view = view
    },
  },
  async created() {
    const contributorId = this.$route.params.contributorId
    const contributorResponse = await axios.get(`/api/contributors/${contributorId}`)
    const contributor = contributorResponse.data
    this.contributor = contributor
    const betRes = await axios.get(`/api/dashboard/${contributorId}`)
    let bets = betRes.data
    bets = sortBets(bets)
    this.bets = bets
  },
}
</script>
<style scoped>
.header {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
.view-btns button {
  margin: 0 4px;
  padding: 8px 100px;
}
button.active {
  background-color: var(--translucent-green);
}
</style>
