<template>
  <v-row>
    <v-col>
      <v-data-table
        :headers="getComputedComparisonTableHeaders"
        :items="getComputedComparisonTableItems"
        :items-per-page="itemsPerPage"
        hide-default-footer
      >
      </v-data-table>
    </v-col>
  </v-row>
</template>
<script>
import BaseCovidStats from "@/components/BaseCovidStats";
import _ from 'lodash'

export default {
  extends: BaseCovidStats,
  computed: {
    getComputedComparisonTableHeaders() {
      var headers = [
        {
          // text: 'prop name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {
          // text: 'value1',
          value: 'value1'
        },
        {
          // text: 'value2',
          value: 'value2'
        },
      ]

      return headers
    },

    getComputedComparisonTableItems() {
      var stats = _.cloneDeep(this.statsData)

      this.formatAllProps(stats[0])
      this.formatAllProps(stats[1])
      // console.log('getComparisonTableItems stats %o', stats);

      var items = []

      var itemNames = [
        "country",
        "updated",
        // "cases",
        // // "todayCases",
        // "deaths",
        // // "todayDeaths",

        "casesPerOneMillion",
        "deathsPerOneMillion",
        "testsPerOneMillion",
        // "oneCasePerPeople",
        // "oneDeathPerPeople",
        // "oneTestPerPeople",
        "activePerOneMillion",
        "recoveredPerOneMillion",
        "criticalPerOneMillion",

        "cases",
        // "todayCases",
        "deaths",
        // "todayDeaths",
      ]

      var labelMap = this.getPropertyToLabelMap()

      _.forEach(itemNames, function (propName) {
        var item = {
          name: labelMap[propName],
          value1: stats[0][propName],
          value2: stats[1][propName],
        }

        items.push(item)
      })

      // console.log('getComparisonTableItems %o', items);

      return items

    },

  },
  data() {
    return {
      itemsPerPage: 100,
    }
  },
}
</script>
