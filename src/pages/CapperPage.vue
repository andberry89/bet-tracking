<template>
  <div v-if="capper">
    <CapperDetails :capper="capper" />
  </div>
  <div v-else>
    <PageNotFound />
  </div>
</template>

<script>
import { cappers } from '@/temp-data'
import PageNotFound from './PageNotFound.vue'
import CapperDetails from '@/components/CapperDetails.vue'

export default {
  name: 'CapperPage',
  data() {
    return {
      capper: cappers.find(capper => capper.id === this.$route.params.capperId),
    }
  },
  components: {
    PageNotFound,
    CapperDetails,
  },
}
</script>
