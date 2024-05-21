<template>
  <div
    v-if="contributor.sports"
    class="page-header"
  >
    <div class="left-side">
      <div class="logo-wrap">
        <img
          :src="contributor.imageUrl"
          height="85"
          width="85"
        />
        <div class="item-name">{{ contributor.name }}</div>
      </div>
      <div class="numbers">
        <table>
          <tr>
            <th></th>
            <th>Today</th>
            <th>Yesterday</th>
            <th>Last 7</th>
            <th>MtD</th>
            <th>YtD</th>
          </tr>
          <tr>
            <td>Won</td>
            <td>{{ this.today.won }}</td>
            <td>{{ this.yesterday.won }}</td>
            <td>{{ this.l7.won }}</td>
            <td>{{ this.mtd.won }}</td>
            <td>{{ this.ytd.won }}</td>
          </tr>
          <tr>
            <td>Lost</td>
            <td>{{ this.today.lost }}</td>
            <td>{{ this.yesterday.lost }}</td>
            <td>{{ this.l7.lost }}</td>
            <td>{{ this.mtd.lost }}</td>
            <td>{{ this.ytd.lost }}</td>
          </tr>
          <tr>
            <td>Risk</td>
            <td>{{ this.today.risk }}</td>
            <td>{{ this.yesterday.risk }}</td>
            <td>{{ this.l7.risk }}</td>
            <td>{{ this.mtd.risk }}</td>
            <td>{{ this.ytd.risk }}</td>
          </tr>
          <tr>
            <td>ROI%</td>
            <td>{{ this.today.roi }}</td>
            <td>{{ this.yesterday.roi }}</td>
            <td>{{ this.l7.roi }}</td>
            <td>{{ this.mtd.roi }}</td>
            <td>{{ this.ytd.roi }}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="contributor-sports">{{ contributor.sports.join(', ') }}</div>
  </div>
</template>
<script>
import dateFormat from 'dateformat'
import calcAll from '@/utils/calcAll'

export default {
  name: 'ContributorDetails',
  props: {
    bets: {
      type: Array,
      required: true,
    },
    contributor: {
      type: Object,
    },
  },
  /**
   * TODO: WRITE A FUNCTION TO CALCULATE ROI, WINS, LOSSES, RISKED, FOR SPECIFIC TIME FRAMES
   * TODO: ADD DATE TO FILTER RESULTS*
   * *
   */
  computed: {
    today() {
      const results = calcAll(this.bets)
      return {
        won: results.today.won,
        lost: results.today.lost,
        risk: results.today.risk,
        roi: results.today.roi,
      }
    },
    yesterday() {
      const results = calcAll(this.bets)
      return {
        won: results.yesterday.won,
        lost: results.yesterday.lost,
        risk: results.yesterday.risk,
        roi: results.yesterday.roi,
      }
    },
    l7() {
      const results = calcAll(this.bets)
      return {
        won: results.lastWeek.won,
        lost: results.lastWeek.lost,
        risk: results.lastWeek.risk,
        roi: results.lastWeek.roi,
      }
    },
    mtd() {
      return {
        won: 0,
        lost: 0,
        risk: 0,
        roi: 0,
      }
    },
    ytd() {
      return {
        won: 0,
        lost: 0,
        risk: 0,
        roi: 0,
      }
    },
  },
  methods: {
    calcAll: calcAll,
    dateFormat: dateFormat,
  },
}
</script>
<style scoped>
.page-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
}
.contributor-sports {
  font: 400 20px/1.2 'Helvetica', 'Arial', sans-serif;
  color: #333;
}
.left-side {
  display: flex;
  justify-content: flex-start;
}
.left-side .numbers {
  margin-left: 15px;
  padding-left: 15px;
  border-left: 1px solid var(--white);
}
.logo-wrap img {
  border-radius: 50%;
}
</style>
