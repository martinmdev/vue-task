<template>
  <div>
<!--    <pre><code>{{ compareStats }}</code></pre>-->
    <v-data-table
      :headers="getComparisonTableHeaders"
      :items="getComparisonTableItems"
      :items-per-page="itemsPerPage"
    >
<!--      <template #item.country="{ value }">-->
<!--        <nuxt-link-->
<!--          :to="{name: 'covid-country', params:{country:value}}"-->
<!--        >-->
<!--          {{ value }}-->
<!--        </nuxt-link>-->
<!--        <a target="_blank" :href="value">-->

<!--        </a>-->
<!--      </template>-->
    </v-data-table>
  </div>
</template>
<script>
import BaseCovidStats from "@/components/BaseCovidStats";
import Card1 from "@/components/Card1";

export default {
  extends: BaseCovidStats,
  data(){
    return{
      itemsPerPage: 100,
    }
  },
}
</script>
