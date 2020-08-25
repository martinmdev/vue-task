<template>
  <v-row>
    <v-col>
      <v-data-table
        :headers="getComparisonTableHeaders"
        :items="getComparisonTableItems"
        :items-per-page="itemsPerPage"
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
    getComparisonTableHeaders() {
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

    getComparisonTableItems() {
      var stats = _.cloneDeep(this.compareStats)

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

      var pickProps = this.getPickProps()
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
