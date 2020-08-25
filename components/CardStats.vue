<template>
  <v-row>
    <card-1
      v-for="(item, index) in getStatsCardsData()"
      :key="index"
      :title="item.name"
      :text="item.value"
    ></card-1>
  </v-row>
</template>
<script>
import BaseCovidStats from "@/components/BaseCovidStats";
import Card1 from "@/components/Card1";

export default {
  extends: BaseCovidStats,
}
</script>
