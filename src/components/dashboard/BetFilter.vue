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
        :class="activeBtn === 'open' ? 'active' : ''"
        @click="filterBets('open')"
      >
        Open
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
      <hr />
      <div class="checkbox-filters">
        <CheckboxInput
          id="filter-future-bet"
          value="filter"
          @update="updateFilter('future', $event)"
          >Future Bets</CheckboxInput
        >
        <CheckboxInput
          id="filter-promos-used"
          value="promo"
          @update="updateFilter('promo', $event)"
          >Promos Used</CheckboxInput
        >
        <CheckboxInput
          id="filter-bonus-bets"
          value="bonus"
          @update="updateFilter('bonus', $event)"
          >Bonus Bets</CheckboxInput
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BetFilter',
  data() {
    return {
      activeBtn: 'all',
      filterOptions: [],
    }
  },
  methods: {
    filterBets(filter) {
      this.activeBtn = filter
      const filterOptions = this.filterOptions
      this.$emit('update', { filter, filterOptions })
    },
    updateFilter(key, e) {
      if (e) {
        this.filterOptions.push(key)
      } else {
        this.filterOptions = this.filterOptions.filter(o => o !== key)
      }
      this.filterBets(this.activeBtn)
    },
  },
}
</script>
<style scoped>
.filter-wrap {
  border: 3px solid var(--green);
  border-radius: 8px;
  min-width: 200px;
  max-height: 50vh;
  text-align: center;
  font: 400 14px/1.2 'Russo One', 'Verdana', sans-serif;
  padding-bottom: 30px;
}
.filter-wrap h3 {
  letter-spacing: 0.125rem;
}
hr {
  width: 80%;
  border-color: var(--green);
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
  background-color: var(--translucent-green);
}
</style>
