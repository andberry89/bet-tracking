<template>
  <div class="edit-dashboard">
    <ModalOverlay
      :showModal="show"
      @update="close"
    >
      <div
        class="modal"
        v-if="this.msg === ''"
      >
        <h4>Settle this bet?</h4>
        <p><button @click="settleBet('won')">Won</button><button @click="settleBet('lost')">Lost</button></p>
        <p><button @click="settleBet('void')">Void Bet</button></p>
        <EditBetItem
          :bet="this.bet"
          :full="true"
        />
      </div>
      <div
        class="modal"
        v-else
      >
        <h3>{{ this.msg }}</h3>
      </div>
    </ModalOverlay>
    <h2>Settle Bets</h2>
    <div class="bet-dashboard-wrap">
      <BetFilter
        @update="updateFilters($event)"
        activeFilter="open"
      />
      <div class="edit-bet-wrap">
        <EditBetItem
          v-for="bet in filteredBets"
          class="edit-component"
          :key="bet._id"
          :bet="bet"
          @click="open(bet._id)"
        />
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import BetFilter from '@/components/dashboard/BetFilter.vue'
import EditBetItem from '@/components/dashboard/EditBetItem.vue'
import filterBets from '@/components/dashboard/utils/filterBets'

export default {
  name: 'EditBetDashboard',
  data() {
    return {
      bet: {},
      filter: 'open',
      filterOptions: [],
      msg: '',
      show: false,
    }
  },
  components: {
    BetFilter,
    EditBetItem,
  },
  props: ['bets'],
  computed: {
    filteredBets() {
      return filterBets(this.bets, this.filter, this.filterOptions)
    },
  },
  methods: {
    filterBets: filterBets,
    close() {
      this.show = false
    },
    open(id) {
      this.bet = this.filteredBets.find(el => el._id === id)
      this.show = true
    },
    async settleBet(val) {
      const path = `/api/dashboard/${this.bet.contributor}/${this.bet._id}`
      let body = { settled: true }
      if (val === 'void') {
        body = { ...body, won: false, void: true }
      } else {
        body = {
          ...body,
          ...(val === 'won' ? { won: true } : { won: false }),
        }
      }
      await axios
        .patch(path, body)
        .then(res => {
          if (res.status === 201) {
            this.msg = 'Bet Settled Successfully!'
            this.bet.settled = true
            this.bet.won = val
          }
        })
        .catch(err => {
          console.log(err)
        })
      setTimeout(() => {
        this.close()
        this.msg = ''
      }, 1500)
    },
    updateFilters({ filter, filterOptions }) {
      this.filter = filter
      this.filterOptions = filterOptions
    },
  },
}
</script>
<style scoped>
.edit-bet-wrap {
  display: flex;
  flex-flow: row wrap;
  justify-content: start;
  align-items: start;
  gap: 10px;
}
.edit-component {
  width: 30%;
}
.modal h4 {
  margin: 0;
  padding: 0;
}
.modal button {
  margin: 0 10px;
}
.modal p {
  margin: 0 0 10px 0;
}
</style>
