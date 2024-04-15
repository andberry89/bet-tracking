<template>
  <div class="bet-wrap">
    <div
      class="bet-item"
      :class="borderStyle(bet)"
      v-for="bet in bets"
      :key="bet._id"
    >
      <img :src="bet.imageUrl" />
      <span class="date"
        >{{ dateFormat(bet.date, 'mmm dd') }}<br />
        {{ dateFormat(bet.date, 'yyyy') }}</span
      >
      <div class="bet-type">
        <p>{{ betType(bet) }}</p>
        <p>{{ bet.future ? 'Future' : '' }}</p>
        <p>{{ bet.sports.join(', ') }}</p>
      </div>
      <div class="bet-legs">
        <ul>
          <li
            v-for="(value, index) in bet.legs"
            :key="index"
          >
            <span class="subject">{{ value.subject }}</span>
            <span class="over-under">{{ value.over ? ' o' : ' u' }}</span>
            <span class="line">{{ value.line }}</span>
            <span class="prop">{{ ' ' + value.prop }}</span>
          </li>
        </ul>
      </div>
      <div class="bet-info">
        <p>{{ bet.book }}</p>
        <p
          v-if="bet.promo"
          class="promo-text"
        >
          <em>Promo used!</em>
        </p>
      </div>
      <div class="bet-wager-info">
        <p><strong>Risk</strong>: {{ bet.risk }}U</p>
        <p><strong>Odds</strong>: {{ bet.odds }}</p>
        <p v-if="!bet.completed"><strong>To Win</strong>: {{ bet.payout }}U</p>
        <p v-if="bet.completed">
          <ArrowComponent :upArrow="bet.win" />
          <span :class="bet.win ? 'bet-win' : 'bet-lose'">{{ bet.win ? bet.payout : '-' + bet.risk }}U</span>
        </p>
      </div>
      <SVGComponent
        v-if="bet.completed"
        :win="bet.win"
      />
    </div>
  </div>
</template>
<script>
import dateFormat from 'dateformat'
import SVGComponent from './common/SVGComponent.vue'
import ArrowComponent from './common/ArrowComponent.vue'
export default {
  name: 'BetDashboard',
  computed: {},
  methods: {
    dateFormat: dateFormat,
    borderStyle(bet) {
      if (!bet.completed) {
        return bet.future ? 'future-bet' : 'pending-bet'
      } else {
        return bet.win ? 'winning-bet' : 'losing-bet'
      }
    },
    betType(bet) {
      const betType = bet.type[0].toUpperCase() + bet.type.slice(1)
      return bet.legs.length > 1 ? bet.legs.length + '-Leg ' + betType : betType
    },
  },
  props: ['bets'],
  components: {
    SVGComponent,
    ArrowComponent,
  },
}
</script>
<style scoped>
.bet-item {
  display: grid;
  grid-template-columns: 90px 0.5fr 1fr 2fr 1fr 1fr 50px;
  column-gap: 5px;
  place-items: center;
  background-color: #131313;
  color: #fff;
  width: 95%;
  margin: 5px auto;
  border-radius: 8px;
  padding: 5px;
  font-size: 16px;
}
.bet-item img {
  border-radius: 50%;
  height: 70px;
  width: 70px;
}
.bet-item p {
  margin: 2px 0;
  display: flex;
  align-items: center;
}
.future-bet {
  border: 3px solid var(--orange);
}
.pending-bet {
  border: 3px solid var(--white);
}
.winning-bet {
  border: 3px solid var(--green);
}
.losing-bet {
  border: 3px solid var(--red);
}
.date {
  font-size: 14px;
  text-align: center;
}
.bet-type,
.bet-legs,
.bet-info,
.bet-wager-info {
  justify-self: start;
}
.bet-type {
  padding-left: 10px;
  border-left: 1px solid var(--white);
}
.bet-legs ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.promo-text {
  font-size: 14px;
  color: var(--green);
}
.bet-win {
  color: var(--green);
}
.bet-lose {
  color: var(--red);
}
</style>
./SVGWinner.vue./SVGComponent.vue./common/SVGComponent.vue
