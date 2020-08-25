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
import _ from 'lodash'

export default {
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
