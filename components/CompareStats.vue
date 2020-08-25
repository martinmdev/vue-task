<template>
  <v-row>
    <v-col>
      <v-data-table
        :headers="getComputedComparisonTableHeaders"
        :items="getComputedComparisonTableItems"
        :items-per-page="itemsPerPage"
        hide-default-footer
      >

        <template #item.value1="{ value }">
          {{ value.formatted }}
          <span
            :style="'color: '+value.diffColor+';'"
            v-if="value.difference"
          >
            ( + {{ value.difference }} )
          </span>
        </template>

        <template #item.value2="{ value }">
          {{ value.formatted }}
          <span
            :style="'color: '+value.diffColor+';'"
            v-if="value.difference"
          >
            ( + {{ value.difference }} )
          </span>
        </template>

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
      var statsFormatted = _.cloneDeep(this.statsData)

      this.formatAllProps(statsFormatted[0])
      this.formatAllProps(statsFormatted[1])
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
      var self = this

      _.forEach(itemNames, function (propName) {
        var item = {
          propName: propName,
          name: labelMap[propName],
          value1: {
            value: stats[0][propName],
            formatted: statsFormatted[0][propName],
          },
          value2: {
            value: stats[1][propName],
            formatted: statsFormatted[1][propName],
          }
        }

        self.addItemDifference(item)

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
  methods: {
    addItemDifference(item) {
      console.log('addItemDifference %o', item);
      var skip = [
        'country',
        'updated',
      ]
      if (skip.indexOf(item.propName) !== -1) {
        return
      }

      var good= [
        'testsPerOneMillion',
        'recoveredPerOneMillion',
      ]

      var diffColor = 'red';
      if (good.indexOf(item.propName) !== -1) {
        diffColor = 'green';
      }

      var diff = item.value1.value - item.value2.value
      var absDiff = Math.abs(diff)
      if (diff > 0) {
        item.value1.difference = absDiff
        item.value1.diffColor = diffColor
      } else {
        item.value2.difference = absDiff
        item.value2.diffColor = diffColor
      }
    }
  },
}
</script>
