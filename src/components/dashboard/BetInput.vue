<template>
  <div class="bet-input">
    <h2>Input Bet</h2>
    <form>
      <div class="bet-info-input">
        <InputDate
          name="bet-date"
          label="Date"
          class="bet-input-field"
          :class="flags.date ? 'valid' : 'invalid'"
          :value="this.details.date"
          @update="updateValue(details, 'date', $event)"
        />
        <InputNumber
          for="odds"
          placeholder="Odds"
          step="1"
          class="bet-input-field number"
          :class="flags.odds ? 'valid' : 'invalid'"
          label="Odds"
          :value="this.details.odds"
          @update="updateValue(details, 'odds', $event)"
        />
        <InputNumber
          for="risk"
          placeholder="Risk/Wager"
          step="0.01"
          min="0"
          class="bet-input-field number"
          :class="flags.risk ? 'valid' : 'invalid'"
          label="Risk/Wager"
          :value="this.details.risk"
          @update="updateValue(details, 'risk', $event)"
        />
        <InputNumber
          for="payout"
          placeholder="Payout"
          step="0.01"
          min="0"
          class="bet-input-field number"
          :class="flags.payout ? 'valid' : 'invalid'"
          label="Payout"
          :value="this.details.payout"
          @update="updateValue(details, 'payout', $event)"
        />
        <InputText
          for="bet-type"
          label="Bet Type"
          :placeholder="betType"
          :disabled="isBuilder"
          :value="betType"
          @update="updateValue(details, 'type', $event)"
          class="bet-input-field number"
        />
        <SelectComponent
          id="book-select"
          name="book-select"
          class="bet-input-field"
          :class="flags.book ? 'valid' : 'invalid'"
          label="Select a Book"
          :options="bookOptions"
          :value="this.details.book"
          @update="updateValue(details, 'book', $event)"
        />
        <div class="radio-group-wrap">
          <RadioButtonGroup
            class="radio-group"
            :options="yesNoOptions"
            label="Future Bet?"
            name="future-bet"
            defaultChoice="No"
            :value="this.details.future"
            @update="updateValue(details, 'future', $event)"
          />
          <RadioButtonGroup
            class="radio-group"
            :options="yesNoOptions"
            label="Bet Settled?"
            name="bet-settled"
            defaultChoice="No"
            :value="this.details.settled"
            @update="updateValue(details, 'settled', $event)"
          />
          <RadioButtonGroup
            class="radio-group"
            :options="yesNoOptions"
            label="Bet Won?"
            name="bet-won"
            defaultChoice="No"
            :disabled="!isSettled"
            :value="this.details.won"
            @update="updateValue(details, 'won', $event)"
          />
          <RadioButtonGroup
            class="radio-group"
            :options="yesNoOptions"
            label="Bonus Bet Used?"
            name="bonus-bet-used"
            defaultChoice="No"
            :value="this.details.bonus"
            @update="updateValue(details, 'bonus', $event)"
          />
          <RadioButtonGroup
            class="radio-group"
            :options="yesNoOptions"
            label="Promo Used?"
            name="promo-used"
            defaultChoice="No"
            :value="this.details.promo"
            @update="updateValue(details, 'promo', $event)"
          />
        </div>
      </div>
      <div class="leg-wrap">
        <h3>Legs</h3>
        <LegInput
          type="add"
          @update="addLeg"
        />
        <LegDetails
          :legs="this.details.legs"
          v-if="this.totalLegs > 0"
          @delete="deleteLeg($event)"
        />
      </div>
      <div
        class="submit-btn"
        v-if="isValidBet"
      >
        <button @click.prevent="addBet(this.details)">Enter Bet</button>
      </div>
      <p
        v-if="betMsg !== ''"
        class="betMsg"
      >
        {{ this.betMsg }}
      </p>
      <p
        v-if="errMsg !== ''"
        class="errMsg"
      >
        {{ this.errMsg }}
      </p>
    </form>
    <BetDashboard
      :bets="this.bets"
      :key="componentKey"
    />
  </div>
</template>
<script>
import axios from 'axios'
import BetDashboard from '@/components/dashboard/BetDashboard.vue'
import LegInput from '@/components/dashboard/LegInput.vue'
import LegDetails from '@/components/dashboard/LegDetails.vue'
import { bookOptions } from '@/utils/selectOptions'
import calcPayout from '@/utils/calcPayout'
import updateValue from '@/utils/updateValue'
import formatBet from '@/utils/formatBet'
import sortBets from '@/utils/sortBets'

const testData = [
  {
    market: 'MLB',
    subject: 'St. Louis Cardinals',
    over: 'Over',
    line: '6.5',
    prop: 'Runs',
    sport: 'Baseball',
  },
  {
    market: 'NBA',
    subject: 'Joker',
    over: 'Over',
    line: '11.5',
    prop: 'Rebounds',
    sport: 'Basketball',
  },
  {
    market: 'NBA',
    subject: 'LeBron James',
    over: 'Under',
    line: '5.5',
    prop: 'Rebounds',
    sport: 'Basketball',
  },
]

export default {
  name: 'BetInput',
  data() {
    return {
      bets: [],
      componentKey: 0,
      details: {
        contributorId: '',
        imageUrl: '',
        date: '',
        risk: '',
        odds: '',
        payout: '',
        settled: 'No',
        won: 'No',
        book: '',
        future: 'No',
        bonus: 'No',
        type: '',
        promo: 'No',
        legs: testData,
      },
      flags: {
        date: false,
        odds: false,
        risk: false,
        payout: false,
        book: false,
      },
      betMsg: '',
      errMsg: '',
      bookOptions: bookOptions,
      yesNoOptions: ['Yes', 'No'],
    }
  },
  components: {
    BetDashboard,
    LegDetails,
    LegInput,
  },
  computed: {
    betType() {
      if (this.totalLegs < 1) {
        return 'Bet Type'
      } else if (this.totalLegs === 1) {
        return 'Straight'
      } else {
        if (this.details.odds > 149) {
          return 'Parlay'
        } else {
          return 'Builder'
        }
      }
    },
    isBuilder() {
      return true
    },
    isValidBet() {
      return (
        this.flags.date &&
        this.flags.odds &&
        this.flags.risk &&
        this.flags.payout &&
        this.flags.book &&
        this.details.legs.length > 0
      )
    },
    isSettled() {
      return this.details.settled === 'Yes'
    },
    sportsInLegs() {
      let sports = []
      this.details.legs.forEach(leg => sports.push(leg.market))
      return sports
    },
    totalLegs() {
      return this.details.legs.length
    },
    totalPayout() {
      return this.details.payout
    },
  },
  methods: {
    calcPayout: calcPayout,
    formatBet: formatBet,
    sortBets: sortBets,
    updateValue: updateValue,
    addLeg(event) {
      this.details.legs.push(event)
    },
    async addBet(details) {
      details.type = this.betType
      const formattedBet = formatBet(details)
      await axios
        .post(`/api/dashboard/${this.details.contributorId}`, formattedBet)
        .then(res => {
          if (res.status === 201) {
            this.betMsg = 'Bet successfully entered!'
          }
        })
        .then(this.bets.push(formattedBet))
        .then((this.bets = sortBets(this.bets)))
        .then(this.componentKey++)
        .catch(err => {
          let errMsg = 'Error: '
          if (err.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(err.response.data)
            console.log(err.response.status)
            errMsg += err.response.data._message
          } else if (err.request) {
            // The request was made but no response was received
            console.log(err.request)
            errMsg = 'Hooked by the server. Check your internet connection and try again'
          } else {
            // Something happened in setting up the request that triggered an Error
            errMsg += err.message + ' Contact the administrator if problem continues.'
            console.log('Error', err.message)
          }
          console.log(err.config)
          this.errMsg = errMsg
        })

      this.resetDetails()
      /**
       * TODO - Get response status to set a message on whether the bat was added or not!
       */
    },
    deleteLeg(idx) {
      this.details.legs.splice(idx, 1)
    },
    resetDetails() {
      document.getElementById('bet-date').value = ''
      this.details.risk = ''
      this.details.odds = ''
      this.details.payout = ''
      this.details.settled = 'No'
      this.details.won = 'No'
      document.getElementById('book-select').selectedIndex = 0
      this.details.future = 'No'
      this.details.bonus = 'No'
      this.details.promo = 'No'
      this.details.legs = []
    },
  },
  watch: {
    'details.date': {
      handler(val) {
        if (val === '') {
          this.flags.date = false
        } else {
          this.flags.date = true
        }
      },
      deep: true,
    },
    'details.odds': {
      handler(val) {
        if (val === '') {
          this.flags.odds = false
        } else if (val > -100 && val < 100) {
          this.flags.odds = false
        } else {
          this.flags.odds = true
          if (this.details.risk !== '') {
            updateValue(this.details, 'payout', calcPayout(val, this.details.risk))
          }
        }
      },
      deep: true,
    },
    'details.risk': {
      handler(val) {
        if (val < 0) {
          this.flags.risk = false
        } else {
          this.flags.risk = true
          if (this.details.odds !== '') {
            updateValue(this.details, 'payout', calcPayout(this.details.odds, val))
          }
        }
      },
      deep: true,
    },
    'details.payout': {
      handler(val) {
        if (val <= 0) {
          this.flags.payout = false
        } else {
          this.flags.payout = true
        }
      },
      deep: true,
    },
    'details.book': {
      handler(val) {
        if (val === '' || val === '--Select a Book--') {
          this.flags.book = false
        } else {
          this.flags.book = true
        }
      },
    },
    isValidBet(val) {
      if (val === true) {
        this.betMsg = ''
        this.errMsg = ''
      }
    },
  },
  async created() {
    const id = this.$route.params.contributorId
    const conRes = await axios.get(`/api/contributors/${id}`)
    const conData = conRes.data
    const betRes = await axios.get(`/api/dashboard/${id}`)
    let bets = betRes.data
    this.details.contributorId = id
    this.details.imageUrl = conData.imageUrl
    bets = sortBets(bets)
    this.bets = bets
  },
}
</script>
<style>
.bet-input {
  text-align: center;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.bet-info-input {
  display: flex;
  flex-wrap: nowrap;
  align-items: stretch;
  gap: 2px;
}
.bet-input-field {
  border: 1px solid var(--white);
}
.number {
  width: 5rem;
}
.radio-group-wrap {
  display: flex;
  flex-wrap: nowrap;
}
.radio-group {
  border: 1px solid var(--white);
  margin: 0 1px;
}
.leg-wrap {
  width: 80%;
}
.submit-btn {
  margin-top: 5px;
}
.valid {
  border: 1px solid var(--green);
}
.invalid {
  border: 3px solid var(--red);
}
.betMsg,
.errMsg {
  font-weight: 700;
  font-size: 18px;
}
.betMsg {
  color: var(--green);
}
.errMsg {
  color: var(--red);
}
</style>
