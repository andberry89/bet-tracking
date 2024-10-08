<template>
  <div>
    <h1>Sheets Review</h1>
    <SheetsList
      :sheets="sheets"
      size="large"
    />
  </div>
</template>

<script>
import SheetsList from '@/components/sheets/SheetsList.vue'
import axios from 'axios'
export default {
  name: 'SheetsPage',
  data() {
    return {
      sheets: [],
    }
  },
  async created() {
    const response = await axios.get('/api/sheets')
    const data = response.data
    this.sheets = data
  },
  components: {
    SheetsList,
  },
}
</script>
