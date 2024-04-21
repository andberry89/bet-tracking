<template>
  <div>
    <BetItem
      v-for="bet in bets"
      :key="bet._id"
      :bet="bet"
    />
  </div>
</template>
<script>
import BetItem from '@/components/dashboard/BetItem.vue'
export default {
  name: 'BetDashboard',
  components: {
    BetItem,
  },
  props: ['bets'],
}
</script>
