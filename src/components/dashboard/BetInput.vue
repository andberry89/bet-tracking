<template>
  <div class="bet-input">
    <h2>Input Bet</h2>
    <form>
      <div class="bet-info-input">
        <InputDate
          name="date"
          label="Date"
          class="bet-input-field"
        />
        <InputNumber
          for="odds"
          placeholder="Odds"
          step="1"
          class="bet-input-field number"
          label="Odds"
        />
        <InputNumber
          for="risk"
          placeholder="Risk/Wager"
          step="0.01"
          min="0"
          class="bet-input-field number"
          label="Risk/Wager"
        />
        <InputNumber
          for="payout"
          placeholder="Payout"
          step="0.01"
          min="0"
          class="bet-input-field number"
          label="Payout"
        />
        <InputText
          for="bet-type"
          label="Bet Type"
          :placeholder="this.betType"
          :disabled="isBuilder"
          class="bet-input-field number"
        />
        <SelectComponent
          id="book-select"
          name="book-select"
          class="bet-input-field"
          label="Select a Book"
          :options="bookOptions"
        />
        <div class="radio-group-wrap">
          <RadioButtonGroup
            class="radio-group"
            :options="yesNoOptions"
            label="Future Bet?"
            name="future-bet"
            defaultChoice="No"
          />
          <RadioButtonGroup
            class="radio-group"
            :options="yesNoOptions"
            label="Bet Settled?"
            name="bet-settled"
            defaultChoice="No"
          />
          <RadioButtonGroup
            class="radio-group"
            :options="yesNoOptions"
            label="Bet Won?"
            name="bet-won"
            defaultChoice="No"
          />
          <RadioButtonGroup
            class="radio-group"
            :options="yesNoOptions"
            label="Bonus Bet Used?"
            name="bonus-bet-used"
            defaultChoice="No"
          />
          <RadioButtonGroup
            class="radio-group"
            :options="yesNoOptions"
            label="Promo Used?"
            name="promo-used"
            defaultChoice="No"
          />
        </div>
      </div>
      <div class="leg-wrap">
        <h3>Legs</h3>
        <LegInput @update="addLeg" />
        <LegDetails
          :legs="this.legs"
          v-if="this.legs.length > 0"
        />
      </div>
      <div class="submit-btn">
        <button>Enter Bet</button>
      </div>
    </form>
  </div>
</template>
<script>
import LegInput from '@/components/dashboard/LegInput.vue'
import LegDetails from '@/components/dashboard/LegDetails.vue'
import { bookOptions } from '@/utils/selectOptions'

const testData = [
  {
    market: 'MLB',
    subject: 'St. Louis Cardinals',
    over: 'Over',
    line: '6.5',
    prop: 'Runs',
  },
  {
    market: 'NBA',
    subject: 'Joker',
    over: 'Over',
    line: '11.5',
    prop: 'Rebounds',
  },
]

export default {
  name: 'BetInput',
  data() {
    return {
      payout: 0,
      legs: testData,
      odds: 0,
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
    totalPayout() {
      return this.payout
    },
    betType() {
      if (this.totalLegs < 1) {
        return 'Bet Type'
      } else if (this.totalLegs === 1) {
        return 'Straight'
      } else {
        if (this.odds > 149) {
          return 'Parlay'
        } else {
          return 'Builder'
        }
      }
    },
    totalLegs() {
      return this.legs.length
    },
    isBuilder() {
      return true
    },
  },
  methods: {
    addLeg(event) {
      this.legs.push(event)
    },
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
  align-self: center;
}
</style>
