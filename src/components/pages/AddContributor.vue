<template>
  <h2>Add a New Contributor</h2>
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
  name: 'AddContributor',
  data() {
    return {
      leagueOptions: leagueOptions,
    }
  },
}
</script>
