<template>
  <div
    v-if="contributor"
    class="wrap"
  >
    <div class="header">
      <h1>Bet Tracking for {{ contributor.name }}</h1>
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
      view: 'input',
    }
  },
  components: {
    BetInput,
    PageNotFound,
  },
  methods: {
    updateView(view) {
      this.view = view
    },
  },
  async created() {
    const contributorId = this.$route.params.contributorId
    const contributorResponse = await axios.get(`/api/contributors/${contributorId}`)
    const contributor = contributorResponse.data
    this.contributor = contributor
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
