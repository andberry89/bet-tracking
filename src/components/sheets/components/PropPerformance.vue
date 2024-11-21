<template>
  <div
    class="prop-stat-wrap"
    v-if="this.prop.total > 0"
  >
    <div class="stat-header">
      <h4>{{ prop.name }}</h4>
    </div>
    <div>{{ prop.hit }} / {{ prop.total }}</div>
    <div class="doughnut-wrap">
      <DoughnutChart :data="chartData(prop.hit, prop.total)" /><span>{{ calcHitRate(prop.hit, prop.total) }}%</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PropPerformance',
  props: {
    prop: {
      type: Object,
      required: true,
    },
  },
  methods: {
    calcHitRate(hit, total) {
      if (total === 0) {
        return 0
      }
      return ((hit * 100) / total).toFixed(2)
    },
    chartData(hit, total) {
      const diff = total - hit
      return {
        labels: ['Hit', 'Miss'],
        datasets: [{ data: [hit, diff], backgroundColor: ['rgb(21,198,60)', 'rgba(21,198,60, 0.2)'] }],
      }
    },
  },
}
</script>
<style scoped>
.prop-stat-wrap {
  text-align: center;
  border-radius: 8px;
}
.stat-header h4 {
  margin: 0;
  padding: 0;
}
.doughnut-wrap {
  height: 100px;
  width: 100px;
  position: relative;
  margin: 0 auto;
}
.doughnut-wrap span {
  position: absolute;
  bottom: 40%;
  right: 25%;
  font-size: 14px;
}
</style>
