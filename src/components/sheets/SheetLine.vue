<template>
  <div
    class="sheet-line-wrap"
    :style="backgroundColorObject"
  >
    <div
      class="player-wrap"
      :style="voidBackground"
    >
      <div class="name-wrap">
        <span class="first-name uppercase">{{ line.player.firstName }}</span>
        <span class="last-name uppercase">{{ line.player.lastName }}</span>
        <span class="team uppercase">
          <span class="location">{{ line.player.team.location }}&nbsp;</span>
          <span class="team-name">{{ line.player.team.name }}</span>
        </span>
      </div>
      <div class="line-img-wrap">
        <img
          :src="this.line.player.team.logo"
          class="logo"
        />
        <img
          v-if="line.player.headshot"
          :src="line.player.headshot.href"
          :alt="line.player.headshot.alt"
          height="105"
          width="147"
          class="headshot"
        />
      </div>
    </div>
    <div
      class="ou-wrap"
      v-if="!line.void"
    >
      <h5>{{ line.overUnder }}</h5>
      <span class="line">{{ line.line }}</span>
      <span
        class="alt-prop"
        v-if="line.altProp !== ''"
        >{{ line.altProp }}</span
      >
    </div>
    <div
      class="result-wrap"
      v-if="!isOpen && !line.void"
    >
      <h5>Result</h5>
      {{ line.result }}
    </div>
    <div
      class="odds-wrap"
      v-if="showOdds && !line.void"
    >
      <h5>Odds</h5>
      {{ getOdds }}
    </div>
    <div
      class="void-text"
      v-if="line.void"
    >
      VOID
    </div>
  </div>
</template>
<script>
export default {
  name: 'SheetLine',
  props: {
    line: {
      type: Object,
    },
  },
  computed: {
    backgroundColorObject() {
      const primaryColor = '#' + this.line.player.team.color
      const altColor = '#' + this.line.player.team.alternateColor
      const borderColor = this.result
      // TODO: Conditionally show border

      return {
        borderLeft: `15px solid var(--${borderColor})`,
        backgroundSize: '100% 100%',
        backgroundImage: `linear-gradient(135deg, #000000 10%, ${primaryColor} 25%, ${altColor} 58%, ${primaryColor} 70%, #000000 92%)`,
      }
    },
    getOdds() {
      if (parseInt(this.line.odds) > 0) {
        return '+' + this.line.odds
      } else {
        return this.line.odds
      }
    },
    isOpen() {
      return this.line.result === null
    },
    logoStyleObject() {
      const url = this.line.player.team.logo

      return {
        content: '',
        display: 'block',
        position: 'absolute',
        left: '0',
        top: '0',
        right: '0',
        bottom: '0',
        width: '100%',
        height: '100%',
        opacity: '0.6',
        backgroundImage: url(`${url}`),
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }
    },
    result() {
      if (this.line.result === null) {
        return 'dark-gray'
      } else {
        return this.line.hit ? 'translucent-green' : 'translucent-red'
      }
    },
    settled() {
      return this.line.hit !== null
    },
    showOdds() {
      return parseInt(this.line.odds)
    },
    voidBackground() {
      const opacity = this.line.void ? '0.6' : '1'

      return {
        opacity: opacity,
      }
    },
  },
}
</script>
<style scoped>
.sheet-line-wrap {
  display: grid;
  grid-template-columns: 6fr 1fr 1fr 1fr;
  place-items: center;
  position: relative;
  overflow: hidden;
}
.player-wrap {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-self: flex-end;
  position: relative;
}
.name-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-self: end;
  width: 100%;
}
.name-wrap div {
  margin: 0;
}
.uppercase {
  text-transform: uppercase;
}
.first-name {
  font-size: 18px;
}
.last-name {
  margin-left: 1px;
  font-size: 24px;
  font-weight: 700;
}
.team {
  font-size: 12px;
  margin-top: 5px;
  color: var(--white);
}
.line-img-wrap {
  position: relative;
}
.line-img-wrap img {
  display: block;
}
.logo {
  position: absolute;
  height: 80px;
  width: auto;
  top: 10%;
  left: 50%;
  opacity: 0.6;
  z-index: 1;
}
.headshot {
  z-index: 99;
  position: relative;
}
.team-name {
  font-weight: 700;
  font-size: 14px;
}
.odds-wrap {
  padding-right: 25px;
}
.ou-wrap {
  text-transform: capitalize;
  display: flex;
  flex-flow: column nowrap;
}
.ou-wrap span {
  display: inline-block;
}
.alt-prop {
  font-size: 12px;
}
.result-wrap,
.odds-wrap,
.ou-wrap {
  text-align: center;
}
.sheet-line-wrap h5 {
  margin: 0;
  padding: 0;
  font-size: 18px;
}
.void-text {
  position: absolute;
  left: 72%;
  font-size: 28px;
  font-family: 'Russo One';
  opacity: 0.8;
}
</style>
