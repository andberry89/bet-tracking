<template>
  <div>
    <h3>{{ title }}</h3>
    <table>
      <thead>
        <tr>
          <th scope="col">Player</th>
          <th scope="col">Appearances</th>
          <th scope="col">Hit Rate %</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="player in players"
          :key="player.name + ' mup'"
        >
          <td>{{ player.name }}</td>
          <td>{{ player.appearances }}</td>
          <td>{{ (player.hitRate.toFixed(2) * 100).toFixed(2) }}%</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'PlayerPerformanceTable',
  props: {
    title: {
      type: String,
      required: true,
      default: '',
    },
    players: {
      type: Array,
      required: true,
    },
  },
}
</script>
<style scoped>
h3 {
  margin: 10px 0;
}
table {
  text-align: center;
  border-collapse: collapse;
}
th,
td {
  padding: 0 5px;
}
table tr {
  border-bottom: 1px solid var(--light-gray);
}
thead tr {
  background-color: var(--translucent-green);
}
tbody th {
  text-align: right;
}
</style>
