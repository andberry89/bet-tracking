<template>
  <table>
    <thead>
      <tr>
        <th></th>
        <th scope="col">Today</th>
        <th scope="col">Yesterday</th>
        <th scope="col">Last 7</th>
        <th scope="col">MtD</th>
        <th scope="col">YtD</th>
      </tr>
    </thead>
    <tbody>
      <tr class="row-won">
        <th scope="row">Won</th>
        <td>+{{ this.results.today.won }}</td>
        <td>+{{ this.results.yesterday.won }}</td>
        <td>+{{ this.results.l7.won }}</td>
        <td>+{{ this.results.mtd.won }}</td>
        <td>+{{ this.results.ytd.won }}</td>
      </tr>
      <tr class="row-lost">
        <th scope="row">Lost</th>
        <td>-{{ this.results.today.lost }}</td>
        <td>-{{ this.results.yesterday.lost }}</td>
        <td>-{{ this.results.l7.lost }}</td>
        <td>-{{ this.results.mtd.lost }}</td>
        <td>-{{ this.results.ytd.lost }}</td>
      </tr>
      <tr class="row-net">
        <th scope="row">Net</th>
        <td :class="this.results.today.net >= 0.0 ? 'won' : 'lost'">
          {{ this.results.today.net >= 0.0 ? '+' : '' }}{{ this.results.today.net }}
        </td>
        <td :class="this.results.yesterday.net >= 0.0 ? 'won' : 'lost'">
          {{ this.results.yesterday.net >= 0.0 ? '+' : '' }}{{ this.results.yesterday.net }}
        </td>
        <td :class="this.results.l7.net >= 0.0 ? 'won' : 'lost'">
          {{ this.results.l7.net >= 0.0 ? '+' : '' }}{{ this.results.l7.net }}
        </td>
        <td :class="this.results.mtd.net >= 0.0 ? 'won' : 'lost'">
          {{ this.results.mtd.net >= 0.0 ? '+' : '' }}{{ this.results.mtd.net }}
        </td>
        <td :class="this.results.ytd.net >= 0.0 ? 'won' : 'lost'">
          {{ this.results.ytd.net >= 0.0 ? '+' : '' }}{{ this.results.ytd.net }}
        </td>
      </tr>
      <tr class="row-risk">
        <th scope="row">Risk</th>
        <td>{{ this.results.today.risk }}</td>
        <td>{{ this.results.yesterday.risk }}</td>
        <td>{{ this.results.l7.risk }}</td>
        <td>{{ this.results.mtd.risk }}</td>
        <td>{{ this.results.ytd.risk }}</td>
      </tr>
      <tr class="row-roi">
        <th scope="row">ROI%</th>
        <td :class="this.results.today.roi >= 0 ? 'won' : 'lost'">
          {{ this.results.today.roi >= 0.0 ? '+' : '' }}{{ this.results.today.roi }}%
        </td>
        <td :class="this.results.yesterday.roi >= 0 ? 'won' : 'lost'">
          {{ this.results.yesterday.roi >= 0.0 ? '+' : '' }}{{ this.results.yesterday.roi }}%
        </td>
        <td :class="this.results.l7.roi >= 0 ? 'won' : 'lost'">
          {{ this.results.l7.roi >= 0.0 ? '+' : '' }}{{ this.results.l7.roi }}%
        </td>
        <td :class="this.results.mtd.roi >= 0 ? 'won' : 'lost'">
          {{ this.results.mtd.roi >= 0.0 ? '+' : '' }}{{ this.results.mtd.roi }}%
        </td>
        <td :class="this.results.ytd.roi >= 0 ? 'won' : 'lost'">
          {{ this.results.ytd.roi >= 0.0 ? '+' : '' }}{{ this.results.ytd.roi }}%
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import calcAll from '@/utils/calcAll'

export default {
  name: 'PerformanceTable',
  props: ['bets'],
  computed: {
    results() {
      return calcAll(this.bets)
    },
  },
  methods: {
    calcAll: calcAll,
  },
}
</script>
<style scoped>
table {
  text-align: center;
  border-collapse: collapse;
}
table tr {
  border-bottom: 1px solid var(--light-gray);
}
th,
td {
  padding: 1px 10px;
}
table tr:not(:first-child) th {
  text-align: right;
}
.row-won td,
.won {
  color: var(--green);
}
.row-lost td,
.lost {
  color: var(--red);
}
</style>
