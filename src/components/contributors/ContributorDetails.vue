<template>
  <div>
    <div
      v-if="contributor.sports"
      class="page-header"
    >
      <div class="left-side">
        <div class="logo-wrap">
          <div class="logo-image">
            <img
              :src="contributor.imageUrl"
              height="85"
              width="85"
            />
          </div>
          <div class="item-name">{{ contributor.name }}</div>
          <div class="contributor-sports">{{ contributor.sports.join(', ') }}</div>
        </div>
        <div class="numbers">
          <PerformanceTable :bets="bets" />
        </div>
      </div>
    </div>
    <div class="chart">
      <ChartsContainer :bets="bets" />
    </div>
  </div>
</template>
<script>
import dateFormat from 'dateformat'
import ChartsContainer from '@/components/contributors/components/ChartsContainer.vue'
import PerformanceTable from './components/PerformanceTable.vue'

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
  components: {
    ChartsContainer,
    PerformanceTable,
  },
  /**
   * TODO: ADD DATE TO FILTER RESULTS
   * TODO: CREATE A BAR GRAPH
   * *
   */
  methods: {
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
  font: 400 16px/1.2 'Helvetica', 'Arial', sans-serif;
  color: #333;
}
.left-side {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.left-side .numbers {
  margin-left: 15px;
  padding-left: 15px;
  border-left: 1px solid var(--white);
}
.logo-wrap {
  text-align: center;
}
.logo-wrap img {
  border-radius: 50%;
}
</style>
