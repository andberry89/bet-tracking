<template>
  <div class="page-header">
    <div class="img-wrap">
      <!-- <img :src="sheet.imageUrl" /> -->
      <div class="item-name">{{ sheet.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SheetDetails',
  props: {
    sheet: {
      type: Object,
    },
  },
}
</script>
