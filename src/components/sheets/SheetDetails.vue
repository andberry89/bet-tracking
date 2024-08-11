<template>
  <div class="page-header">
    <div class="img-wrap">
      <!-- <img :src="sheet.imageUrl" /> -->
      <div class="item-name">{{ sheet.name }}</div>
      {{ sheet._id }}
    </div>
  </div>
</template>

<script>
/** TODO
 * SET UP THE API TO PULL ALL TEAM DATA ONCE PER DAY - MLB TEAM PLAYERS
 * CREATE A LIST OF ATHLETES FROM ALL TEAMS
 * RUN AN AUDIT OVER NIGHT TO CHECK SHEETS - USING MLB SUMMARY
 */

export default {
  name: 'SheetDetails',
  props: {
    sheet: {
      type: Object,
    },
  },
}
</script>
