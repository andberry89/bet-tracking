<template>
  <div class="full-card-wrap">
    <div class="masthead">
      <div
        class="headshot-modal"
        :style="headshotBackgroundObject"
      >
        <div class="overlay"></div>
        <img
          :src="player.headshot.href"
          class="headshot"
          :alt="player.headshot.alt"
        />
        <img
          :src="player.team.logo"
          :alt="player.team.displayName"
          class="logo"
        />
      </div>
      <div class="top-right">
        <div
          class="player-info-wrap"
          :style="playerInfoBackground"
        >
          <span class="first-name name">{{ player.firstName }}</span>
          <span class="last-name name">{{ player.lastName }}</span>
          <span
            class="team-name name"
            :style="teamTextColor"
            >{{ player.team.displayName }}</span
          >
        </div>
        <div class="overall-stats-wrap">
          <div class="overall-card">
            <h4>HITS</h4>
            <span>{{ player.hits }}</span>
          </div>
          <div class="overall-card">
            <h4>PICKS</h4>
            <span>{{ player.appearances }}</span>
          </div>
          <div class="overall-card">
            <h4>HIT RATE</h4>
            <span>{{ (player.hitRate * 100).toFixed(2) }}%</span>
          </div>
        </div>
      </div>
    </div>
    <div class="lines-wrap">
      <div class="modal-line-header-row">
        <div>Date</div>
        <div>Line</div>
        <div>Result</div>
        <div>Odds</div>
      </div>
      <ModalPlayerCardLine
        v-for="line in playerLines"
        :key="line.prop + '-' + line.date"
        :line="line"
        :propName="getPropName(line.prop)"
      />
    </div>
  </div>
</template>
<script>
import ModalPlayerCardLine from './ModalPlayerCardLine.vue'
import propNames from '@/utils/sheets/propNames'

export default {
  name: 'ModalPlayerCard',
  data() {
    return {
      actualProps: [],
    }
  },
  props: {
    player: {
      type: Object,
      required: true,
    },
  },
  components: {
    ModalPlayerCardLine,
  },
  computed: {
    headshotBackgroundObject() {
      const primaryColor = '#' + this.player.team.color
      const altColor = '#' + this.player.team.alternateColor

      return {
        background: `conic-gradient(from 180deg at 50% 50%, ${altColor}, ${primaryColor})`,
      }
    },
    playerInfoBackground() {
      const color = '#' + this.player.team.color
      const altColor = '#' + this.player.team.alternateColor

      return {
        background: `linear-gradient(45deg, ${color} 45%, ${altColor} 84%, rgb(19,19,19) 84%)`,
      }
    },
    playerLines() {
      let newLines = this.player.lines
      return newLines.sort((a, b) => {
        b.getTime - a.getTime
      })
    },
    teamTextColor() {
      const color = '#' + this.player.team.alternateColor
      return {
        color: `${color}`,
      }
    },
  },
  methods: {
    propNames: propNames,
    getPropName(prop) {
      const newProps = this.actualProps.map(e => {
        const key = Object.keys(e)[0]
        const val = Object.values(e)[0]
        return {
          slug: key,
          name: val,
        }
      })
      const idx = newProps.findIndex(e => e.slug === prop)
      return newProps[idx].name
    },
  },
  created() {
    const sheetId = this.$route.params.sheetId
    this.actualProps = this.propNames(sheetId)
  },
}
</script>
<style scoped>
.full-card-wrap {
  background-color: var(--dark-gray);
  width: 1200px;
  padding: 50px;
}
.masthead {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  gap: 10px;
}
.headshot-modal {
  position: relative;
  height: 300px;
  width: 400px;
  border-radius: 12px;
  overflow: hidden;
  z-index: 1;
  margin: 0;
}
.overlay {
  position: absolute;
  top: 0;
  right: -75px;
  z-index: 10;
  width: 150px;
  height: 390px;
  background: var(--translucent-dark-gray);
  transform: skew(-20deg);
}
.headshot {
  height: auto;
  width: 450px;
  border-radius: 0;
  position: absolute;
  bottom: 0;
  left: -4%;
}
.logo {
  z-index: -1;
  position: absolute;
  top: 5px;
  right: 0;
  opacity: 0.5;
  height: 150px;
  width: auto;
}
.top-right {
  flex-grow: 2;
}
.player-info-wrap {
  display: flex;
  flex-flow: column nowrap;
  line-height: 40px;
  border-radius: 8px;
  padding: 4px;
}
.first-name {
  font-size: 36px;
}
.last-name {
  font-size: 46px;
  font-weight: 700;
}
.team-name {
  font-size: 28px;
  text-transform: uppercase;
}
.name {
  display: inline-block;
}
.overall-stats-wrap {
  display: flex;
  flex-flow: row nowrap;
  gap: 10px;
  justify-content: space-between;
  margin-top: 15px;
  height: 40%;
}
.overall-card {
  border-radius: 8px;
  background-color: var(--light-gray);
  width: 30%;
  text-align: center;
  font-size: 24px;
  vertical-align: middle;
}
.overall-card h4 {
  margin: 0 0 10px 0;
  font-size: 30px;
}
.lines-wrap {
  margin: 0 auto;
}
.modal-line-header-row {
  display: grid;
  grid-template-columns: 200px 2fr 1fr 1fr;
  text-align: center;
  font-weight: 700;
  font-size: 16px;
  margin-top: 10px;
}
</style>
