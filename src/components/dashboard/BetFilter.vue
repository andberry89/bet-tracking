<template>
  <div class="filter-wrap">
    <h3>FILTERS</h3>
    <div class="main-filters">
      <button
        :class="activeBtn === 'all' ? 'active' : ''"
        @click="filterBets('all')"
      >
        All
      </button>
      <button
        :class="activeBtn === 'settled' ? 'active' : ''"
        @click="filterBets('settled')"
      >
        Settled
      </button>
      <button
        :class="activeBtn === 'won' ? 'active' : ''"
        @click="filterBets('won')"
      >
        Won
      </button>
      <button
        :class="activeBtn === 'lost' ? 'active' : ''"
        @click="filterBets('lost')"
      >
        Lost
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BetFilter',
  data() {
    return {
      activeBtn: 'all',
    }
  },
  methods: {
    filterBets(filter) {
      this.activeBtn = filter
      this.$emit('update', filter)
    },
  },
}
</script>
<style scoped>
.filter-wrap {
  border: 3px solid var(--green);
  border-radius: 8px;
  min-width: 200px;
  height: 60vh;
  text-align: center;
  font: 400 14px/1.2 'Russo One', 'Verdana', sans-serif;
}
.filter-wrap h3 {
  letter-spacing: 0.125rem;
}
.main-filters {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
.main-filters button {
  width: 80%;
  height: 40px;
}
.main-filters button.active {
  background-color: var(--green);
}
</style>
