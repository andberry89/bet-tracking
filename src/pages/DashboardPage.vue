<template>
  <div>
    <h1>Dashboard</h1>
    <h2>Contributors</h2>
    <div class="dashboard-grid">
      <div
        class="dashboard-grid-item"
        v-for="contributor in contributors"
        :key="contributor.id"
      >
        <img :src="contributor.imageUrl" />
        <router-link
          class="contributor-link"
          :to="'/dashboard/' + contributor._id"
          >{{ contributor.name }}</router-link
        >
      </div>
    </div>
    <h2>Most Recent Bets</h2>
    <BetDashboard :bets="this.bets" />
  </div>
</template>
<script>
import axios from 'axios'
import BetDashboard from '../components/BetDashboard'

export default {
  name: 'DashboardPage',
  data() {
    return {
      contributors: [],
      bets: [],
    }
  },
  components: {
    BetDashboard,
  },
  async created() {
    const betResponse = await axios.get('/api/dashboard/bets')
    const contributorResponse = await axios.get('/api/contributors')
    const bets = betResponse.data
    const contributors = contributorResponse.data
    this.bets = bets
    this.contributors = contributors
  },
}
</script>
<style scoped>
a {
  font: 400 14px/1.2 'Helvetica', sans-serif;
  text-decoration: none;
}
.dashboard-grid {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 12px;
  font: 400 14px/1.2 'Helvetica', sans-serif;
}
.dashboard-grid-item {
  align-items: center;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0px 2px 5px var(--green);
  display: flex;
  flex-direction: column;
  margin-bottom: 2%;
  padding: 20px;
  width: 18%;
  transition: all 0.2s;
}
.dashboard-grid-item:hover {
  box-shadow: 2px 4px 12px var(--green);
}
.dashboard-grid-item img {
  height: 80px;
  width: 80px;
  border-radius: 50%;
}
.contributor-link {
  font-family: 'Manrope';
  font-size: 16px;
}
.contributor-link:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>
