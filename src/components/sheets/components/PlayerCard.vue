<template>
  <div class="player-card-wrap">
    <div
      class="img-wrap"
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
      <div class="info-wrap">
        <div
          v-for="stat in propStats"
          :key="stat.name"
          class="stat-wrap"
        >
          <span class="prop-name">{{ stat.name }}</span>
          <br />
          <span class="hit-appearances">{{ stat.hit }} / {{ stat.appearances }}</span>
        </div>
      </div>
    </div>
    <div class="text-wrap">
      <div class="display-name">
        <span class="first-name">{{ player.firstName }}</span>
        &nbsp;
        <span class="last-name">{{ player.lastName }}</span>
      </div>
      <div class="overall-stats-wrap">
        <div
          class="overall-card"
          v-for="item in overallStats"
          :key="item.label"
        >
          <h3>{{ item.label }}</h3>
          {{ item.value }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import calcPlayerProps from '../utils/calcPlayerProps'

export default {
  name: 'PlayerCard',
  data() {
    return {
      propStats: [],
      overallStats: [],
    }
  },
  props: {
    player: {
      type: Object,
      required: true,
    },
  },
  computed: {
    dynamicTextColor() {
      let hitRate = this.player.hitRate * 100
      let color = ''
      if (hitRate === 100) {
        color = 'green'
      } else if (hitRate < 100 && hitRate > 49) {
        color = 'orange'
      } else {
        color = 'red'
      }

      const finalColor = `var(--${color})`

      return {
        color: `${finalColor}`,
      }
    },
    headshotBackgroundObject() {
      const primaryColor = '#' + this.player.team.color
      const altColor = '#' + this.player.team.alternateColor

      return {
        background: `conic-gradient(from 180deg at 50% 50%, ${altColor}, ${primaryColor})`,
      }
    },
  },
  methods: {
    calcPlayerProps: calcPlayerProps,
  },
  created() {
    this.propStats = calcPlayerProps(this.player.lines)
    const hitRate = (this.player.hitRate * 100).toFixed(2) + '%'
    this.overallStats = [
      {
        label: 'Hits',
        value: this.player.hits,
      },
      {
        label: 'Picks',
        value: this.player.appearances,
      },
      {
        label: 'Hit Rate',
        value: hitRate,
      },
    ]
  },
}
</script>
<style scoped>
.player-card-wrap {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin: 5px 0;
  padding: 15px;
  width: 333px;
  border: 1px solid var(--white);
  border-radius: 15px;
  overflow: hidden;
}
.player-card-wrap:hover {
  cursor: pointer;
}
.img-wrap {
  text-align: center;
  position: relative;
  height: 220px;
  width: 300px;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: -2;
  margin: 0;
}
.headshot {
  height: auto;
  width: 320px;
  border-radius: 0;
  position: absolute;
  bottom: 0;
  left: -4%;
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
.logo {
  z-index: -1;
  position: absolute;
  top: 5px;
  right: 0;
  opacity: 0.5;
  height: 125px;
  width: auto;
}
.text-wrap {
  text-align: center;
  font-size: 16px;
  width: 100%;
  position: relative;
}
.display-name {
  text-transform: uppercase;
  width: 80%;
  padding: 12px 0;
  color: var(--white);
  background: rgb(21, 198, 60);
  background: linear-gradient(150deg, rgba(21, 198, 60, 1) 0%, rgba(255, 131, 23, 1) 100%);
  border-radius: 15px;
  position: absolute;
  top: -22px;
  left: 10%;
}
.first-name {
  font-size: 14px;
}
.last-name {
  font-weight: 700;
}
.info-wrap {
  margin-top: 30px;
  position: absolute;
  top: 0;
  left: 10px;
}
.stat-wrap {
  background-color: var(--translucent-gray);
  border-radius: 8px;
  padding: 4px;
  font-size: 12px;
  text-align: center;
  margin: 5px 0;
  width: 55px;
}
.prop-name {
  text-transform: uppercase;
  font-weight: 700;
  font-size: 14px;
}
.overall-stats-wrap {
  margin-top: 30px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  gap: 10px;
}
.overall-stats-wrap h3 {
  text-transform: uppercase;
  font-size: 14px;
  margin: 0;
}
.overall-card {
  background-color: var(--translucent-gray);
  border-radius: 8px;
  padding: 4px;
  width: 30%;
}
.appearances {
  color: var(--white);
  font-size: 24px;
  margin-right: 8px;
}
</style>
