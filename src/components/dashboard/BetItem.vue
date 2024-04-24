<template>
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
        >{{ dateFormat(bet.date, 'UTC:mmm dd') }},<br />
        {{ dateFormat(bet.date, 'UTC:yyyy') }}</span
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
        <p><strong>Odds</strong>: {{ bet.odds > 0 ? '+' + bet.odds : bet.odds }}</p>
        <p><strong>Risk</strong>: {{ bet.risk }}U</p>
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
import borderStyle from './utils/borderStyle'
import getImgUrl from './utils/getImgUrl'
import getOUS from './utils/getOUS'
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
    getImgUrl: getImgUrl,
    getOUS: getOUS,
    borderStyle: borderStyle,
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
  margin: 0 auto 5px;
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
}
.small-text {
  font-size: 12px;
}
</style>
