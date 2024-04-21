<template>
  <!-- TODO BUILD A FILTER COMPONENT -->
  <div class="bet-wrap">
    <div
      class="bet-item"
      :class="borderStyle(bet)"
      :key="bet._id"
    >
      <img
        class="logo-img"
        :src="bet.imageUrl"
      />
      <span class="date"
        >{{ dateFormat(bet.date, 'mmm dd') }}<br />
        {{ dateFormat(bet.date, 'yyyy') }}</span
      >
      <div class="bet-type">
        <p>{{ bet.type }}</p>
        <p class="future-text">{{ bet.future ? 'Future' : '' }}</p>
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
              <span class="over-under">{{ getOUS(value.over, value.line) }}</span>
              <span class="line">{{ value.line }}</span>
            </div>
            <div>
              <span class="prop">{{ value.over === 'Spread' ? ' Spread' : ' ' + value.prop }}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="bet-info">
        <p>{{ bet.book }}</p>
        <p
          v-if="bet.promo"
          class="bonus-promo-text"
        >
          <em>Promo used!</em>
        </p>
        <p
          v-if="bet.bonus"
          class="bonus-promo-text"
        >
          <em>Bonus bet used!</em>
        </p>
      </div>
      <div class="bet-wager-info">
        <p><strong>Risk</strong>: {{ bet.risk }}U</p>
        <p><strong>Odds</strong>: {{ bet.odds > 0 ? '+' + bet.odds : bet.odds }}</p>
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
  name: 'BetItem',
  data() {
    return {}
  },
  props: {
    bet: {
      type: Object,
      required: true,
    },
  },
  methods: {
    dateFormat: dateFormat,
    borderStyle(bet) {
      if (!bet.settled) {
        return bet.future ? 'future-bet' : 'pending-bet'
      } else {
        return bet.won ? 'winning-bet' : 'losing-bet'
      }
    },
    getImgUrl(path) {
      return require('@/assets/icons/' + path.toLowerCase() + '.png')
    },
    getOUS(val, line) {
      val = val.toLowerCase()
      switch (val) {
        case 'over':
          return 'o'
        case 'under':
          return 'u'
        case 'spread':
          if (line > 0) {
            return '+'
          } else {
            return ''
          }
        default:
          return ''
      }
    },
  },
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
.logo-img {
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
.bonus-promo-text {
  font-size: 14px;
  color: var(--green);
}
.bet-won {
  color: var(--green);
}
.bet-lose {
  color: var(--red);
}
.small-text {
  font-size: 12px;
}
.icon-wrap {
  height: 30px;
}
.icon-wrap ul {
  list-style-type: none;
  position: relative;
  margin: 0;
}
.sport-icon {
  position: absolute;
  padding: 0;
}
</style>
