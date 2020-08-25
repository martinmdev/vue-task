<template>
  <v-row>
    <v-col
      v-for="(item, index) in getStatsCardsData()"
      :key="index"
      cols="6"
    >
    <card-simple
      :title="item.name"
      :text="item.value"
    ></card-simple>
    </v-col>
  </v-row>
</template>
<script>
import BaseCovidStats from "@/components/BaseCovidStats";
import _ from 'lodash'
import CardSimple from "@/components/CardSimple";

export default {
  components: {CardSimple},
  extends: BaseCovidStats,
  methods: {
    getStatsCardsData() {
      var labelMap = this.getPropertyToLabelMap()
      var self = this

      var data = []
      var stats = _.pick(this.stats, this.getPickProps());
      _.forEach(stats, function (value, key) {
        var filteredValue = self.formatPropValue(key, value)
        var elem = {
          name: labelMap[key],
          value: filteredValue,
        }

        data.push(elem)
      })

      return data
    },
  },
}
</script>
