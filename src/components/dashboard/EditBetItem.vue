<template>
  <div
    class="edit-bet-item"
    :class="borderStyle(bet)"
  >
    <div class="date">
      <span>{{ dateFormat(bet.date, 'UTC:mm/dd/yy') }}</span>
    </div>
    <div class="bet-type">
      <span>{{ betType }}</span>
    </div>
    <div class="units">
      <span
        v-if="bet.settled"
        :class="bet.won ? 'bet-won' : 'bet-lose'"
        >{{ bet.won ? '+' + bet.payout : '-' + bet.risk }}U</span
      >
      <span
        v-if="!bet.settled"
        class="bet-pending"
        >{{ bet.risk }}</span
      >
    </div>
    <div class="icon-wrap">
      <ul>
        <li
          v-for="(sport, i) in bet.sports"
          :key="sport"
          class="sport-icon"
          :style="{ left: `${i * 13}px` }"
        >
          <img
            width="25"
            height="25"
            :src="getImgUrl(sport)"
            :alt="sport"
          />
        </li>
      </ul>
    </div>
    <div class="odds">
      <span>{{ betOdds }}</span>
    </div>
    <div class="bet-legs">
      <ul>
        <li
          v-for="(value, index) in betLegs"
          :key="index"
        >
          <span class="subject">{{ value.subject + '  ' }}</span>
          <span>{{ getOUS(value.over, value.line) }} {{ value.line ? value.line : '' }}</span>
          <span class="prop">{{ value.over === 'Spread' ? ' Spread' : ' ' + value.prop }}</span>
        </li>
      </ul>
    </div>
    <div class="bottom-row">
      <span>{{ bet.book }}</span>
      <span
        v-if="bet.future"
        class="future-text"
        >Future Bet</span
      >
      <span
        v-if="bet.promo"
        class="bonus-promo-text"
        >Promo Used</span
      >
      <span
        v-if="bet.bonus"
        class="bonus-promo-text"
        >Bonus Bet</span
      >
    </div>
  </div>
</template>
<script>
import borderStyle from './utils/borderStyle'
import dateFormat from 'dateformat'
import getImgUrl from './utils/getImgUrl'
import getOUS from './utils/getOUS'

export default {
  name: 'EditBetItem',
  props: {
    bet: {
      type: Object,
      required: true,
    },
    full: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  computed: {
    betLegs() {
      if (this.bet.legs.length < 4 || this.full === 'true') {
        return this.bet.legs
      } else {
        let legs = this.bet.legs.slice(0, 2)
        let extraLegs = this.bet.legs.length - 2
        legs.push({ subject: '+' + extraLegs + ' more legs...', over: '', line: '', prop: '' })
        return legs
      }
    },
    betOdds() {
      if (this.bet.odds > 0) {
        return '+' + this.bet.odds
      } else {
        return this.bet.odds
      }
    },
    betType() {
      let type = this.bet.type.toLowerCase()

      switch (type) {
        case 'straight':
          type = 'Straight'
          break
        case 'builder':
          type = 'Builder'
          break
        case 'parlay':
          type = this.bet.legs.length + '-Leg Parlay'
          break
      }
      return type
    },
  },
  methods: {
    borderStyle: borderStyle,
    dateFormat: dateFormat,
    getImgUrl: getImgUrl,
    getOUS: getOUS,
  },
}
</script>
<style scoped>
.edit-bet-item {
  padding: 0 10px;
  font-size: 14px;
  display: grid;
  min-height: 10rem;
  grid-template-columns: [col1] auto [col2] 1fr [col3] auto [end];
  grid-template-rows: [row1] max-content [row2] 30px [row3] 1fr [row4] 30px [row-end];
  gap: 2px;
  align-items: end;
  border-radius: 8px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.edit-bet-item:hover {
  cursor: pointer;
}
.bet-type {
  justify-self: center;
}
.bet-type,
.bet-pending {
  font-weight: 700;
  color: var(--blue);
}
.units,
.odds {
  justify-self: end;
}
.odds {
  grid-column-start: col3;
  grid-column-end: end;
  align-self: start;
}
.bet-legs {
  font-size: 14px;
  grid-column-start: col1;
  grid-column-end: end;
  justify-self: start;
  align-self: start;
}
.bet-legs ul {
  margin: 0;
  padding: 0;
}
.bet-legs ul li {
  display: grid;
  grid-template-columns: auto max-content 1fr;
  justify-self: start;
}
.subject {
  font-weight: 700;
  justify-self: end;
  margin-right: 6px;
}
.prop {
  margin-left: 5px;
}
.bottom-row {
  grid-column-start: col1;
  grid-column-end: end;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  border-top: 1px solid var(--white);
  font-size: 12px;
}
</style>
