<template>
  <div class="sheet-view">
    <div class="sheet-date">{{ date }}</div>
    <div
      v-for="prop in sheet.props"
      :key="prop.name"
    >
      {{ prop.name }}
      {{ prop.values }}
    </div>
  </div>
</template>
<script>
import dateFormat from 'dateformat'
import propNames from '@/utils/sheets/propNames'
export default {
  name: 'SheetView',
  data() {
    return {
      props: [],
    }
  },
  props: {
    sheet: {
      type: Object,
    },
  },
  computed: {
    date() {
      return dateFormat(this.sheet.date, 'UTC:mm/dd/yyyy')
    },
  },
  methods: {
    dateFormat: dateFormat,
  },
  async created() {
    this.props = propNames(this.sheet.sheet)
  },
}
</script>
