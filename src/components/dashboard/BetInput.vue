<template>
  <div class="bet-input">
    <h2>Input Bet</h2>
    <form>
      <div class="bet-info-input">
        <InputDate
          name="date"
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
        <LegInput @update="addLeg" />
        <LegDetails
          :legs="this.details.legs"
          v-if="this.totalLegs > 0"
          ref="legs"
        />
      </div>
      <div
        class="submit-btn"
        v-if="isValidBet"
      >
        <button @click.prevent="addBet(this.details)">Enter Bet</button>
      </div>
    </form>
    {{ this.details }}
  </div>
</template>
<script>
import axios from 'axios'
import LegInput from '@/components/dashboard/LegInput.vue'
import LegDetails from '@/components/dashboard/LegDetails.vue'
import { bookOptions } from '@/utils/selectOptions'
import calcPayout from '@/utils/calcPayout'
import updateValue from '@/utils/updateValue'
import formatBet from '@/utils/formatBet'

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
      contributorId: '',
      imageUrl: '',
      details: {
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
      bookOptions: bookOptions,
      yesNoOptions: ['Yes', 'No'],
    }
  },
  components: {
    LegDetails,
    LegInput,
  },
  props: {
    contributor: String,
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
    updateValue: updateValue,
    addLeg(event) {
      this.details.legs.push(event)
    },
    async addBet(details) {
      const formattedBet = formatBet(details)
      console.log(formattedBet)
      await axios.post(`/api/dashboard/${this.contributorId}`, formattedBet)
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
  },
  async created() {
    const id = this.$route.params.contributorId
    const response = await axios.get(`/api/contributors/${id}`)
    const data = response.data
    this.contributorId = id
    this.imageUrl = data.imageUrl
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
</style>
