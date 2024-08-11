<template>
  <h2>Add a New Sheet</h2>
  <form>
    <label>Name: <input type="text" /></label>
    <label>Specialties:</label>
    <CheckboxInput
      v-for="league in leagueOptions"
      :key="league"
      :id="league"
      :value="league"
      >{{ league.value }}</CheckboxInput
    >
  </form>
</template>
<script>
import { leagueOptions } from '@/utils/selectOptions'

export default {
  name: 'AddSheet',
  data() {
    return {
      leagueOptions: leagueOptions,
    }
  },
}
// todo: make this one
</script>
