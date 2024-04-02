<template>
  <h1>Contributors</h1>
  <CappersList :cappers="cappers" />
</template>

<script>
import CappersList from '@/components/CappersList.vue'
import { cappers } from '@/temp-data.js'
export default {
  name: 'CappersPage',
  data() {
    return {
      cappers,
    }
  },
  components: {
    CappersList,
  },
}
</script>
