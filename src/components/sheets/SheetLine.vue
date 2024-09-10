<template>
  <div class="sheet-line-wrap">
    <div
      class="name-wrap"
      :style="'border-left: 15px solid var(--' + result + ')'"
    >
      <div class="first-name uppercase">{{ firstName }}</div>
      <div class="last-name uppercase">{{ lastName }}</div>
    </div>
    <div class="ou-wrap">
      {{ line.overUnder }}
    </div>
    <div class="line-wrap">{{ line.line }}</div>
    <div class="result-wrap">{{ line.result }}</div>
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
    firstName() {
      return this.line.player.split(' ')[0]
    },
    lastName() {
      return this.line.player.split(' ').slice(1).join(' ')
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
  },
}
</script>
<style scoped>
.sheet-line-wrap {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  place-items: center;
  padding: 4px 2px;
}
.name-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-self: end;
  width: 100%;
}
.uppercase {
  text-transform: uppercase;
}
.first-name {
  font-size: 14px;
}
.last-name {
  margin-left: 1px;
  font-size: 18px;
  font-weight: 700;
}
.ou-wrap {
  text-transform: capitalize;
}
.result-wrap {
  font-weight: 700;
}
</style>
