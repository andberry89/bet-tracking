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
        <p>{{ bet.type }}</p>
        <p class="future-text">{{ bet.future ? 'Future' : '' }}</p>
        <p>{{ bet.sports.join(', ') }}</p>
      </div>
      <div class="bet-legs">
        <ul>
          <li
            v-for="(value, index) in bet.legs"
            :key="index"
          >
            <div class="subject">
              <span class="subject"
                ><strong>{{ value.subject }}</strong></span
              >
            </div>
            <div>
              <span class="over-under">{{ getOUS(value.over) }}</span> <span class="line">{{ value.line }}</span>
            </div>
            <div>
              <span class="prop">{{ ' ' + value.prop }}</span>
            </div>
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
        <p v-if="!bet.settled"><strong>To win</strong>: {{ bet.payout }}U</p>
        <p v-if="bet.settled">
          <ArrowComponent :upArrow="bet.won" />
          <span :class="bet.won ? 'bet-won' : 'bet-lose'">{{ bet.won ? bet.payout : '-' + bet.risk }}U</span>
        </p>
      </div>
      <SVGComponent
        v-if="bet.settled"
        :won="bet.won"
      />
    </div>
  </div>
</template>
<script>
import dateFormat from 'dateformat'
export default {
  name: 'BetDashboard',
  methods: {
    dateFormat: dateFormat,
    borderStyle(bet) {
      if (!bet.settled) {
        return bet.future ? 'future-bet' : 'pending-bet'
      } else {
        return bet.won ? 'winning-bet' : 'losing-bet'
      }
    },
    getOUS(val) {
      val = val.toLowerCase()
      switch (val) {
        case 'over':
          return 'o'
        case 'under':
          return 'u'
        default:
          return ''
      }
    },
  },
  props: ['bets'],
}
</script>
<style scoped>
.bet-item {
  display: grid;
  grid-template-columns: 90px 0.5fr 0.5fr 2fr 0.75fr 0.75fr 50px;
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
.future-text {
  color: var(--orange);
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
.bet-legs ul li {
  display: grid;
  grid-template-columns: 1.5fr max-content 1fr;
  column-gap: 10px;
}
.subject {
  justify-self: end;
}
.promo-text {
  font-size: 14px;
  color: var(--green);
}
.bet-won {
  color: var(--green);
}
.bet-lose {
  color: var(--red);
}
</style>
