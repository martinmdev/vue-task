<template>
  <v-row>
    <v-col cols="3">
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        placeholder="Country"
        single-line
        hide-details
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-data-table
        :search="search"
        :headers="getTableHeaders()"
        :items="getTableItems()"
        :custom-filter="customFilter"
      >
        <template #item.country="{ value }">

          <nuxt-link
            :to="{name: 'covid-country', params:{country:value.name}}"
          >
            <v-img
              :src="value.flag"
              :width="24"
              :height="16"
              style="display: inline-block;"
            ></v-img>
            {{ value.name }}
          </nuxt-link>
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
  data() {
    return {
      search: '',
    }
  },
  methods: {
    getTableHeaders() {
      // "country",
      //   // "countryInfo",
      //   "cases",
      //   "todayCases",
      //   "deaths",
      //   "todayDeaths",

      var labelMap = this.getPropertyToLabelMap()
      var tableItems = this.getTableItems()

      if (tableItems.length) {

        var headers = []

        _.forEach(tableItems[0], function (value, propName) {
          let header = {
            text: labelMap[propName],
            value: propName,
          }
          headers.push(header)
        })

        headers[0].align = 'start'
        headers[0].sortable = false
      }

      // var headers = [
      //   {
      //     text: labelMap['country'],
      //     align: 'start',
      //     sortable: false,
      //     value: 'country',
      //   },
      //   {text: labelMap['cases'], value: 'cases'},
      //   {text: labelMap['todayCases'], value: 'todayCases'},
      //   {text: labelMap['deaths'], value: 'deaths'},
      //   {text: labelMap['todayDeaths'], value: 'todayDeaths'},
      // ]

      return headers
    },

    getTableItems() {
      var items = []
      var self = this

      var pickProps = this.getPickProps()

      _.forEach(this.tableStats, function (value, key) {
        var item = _.pick(value, pickProps);
        let name = value['country']
        let nameLowercase = _.toLower(name)
        item.country = value['countryInfo']
        item.country.name = name
        item.country.nameLowercase = nameLowercase
        self.formatAllProps(item)
        items.push(item)
      })

      return items

    },
    customFilter(value, search, item) {

      if (value == null) {
        return false
      }

      if (search == null) {
        return false
      }

      if (typeof value === 'string') {
        return false
      }

      // console.log('customFilter %o', arguments)
      var nameLowercase = _.get(item, 'country.nameLowercase', '')
      if (_.isString(nameLowercase)) {
        var searchToLower = _.toLower(search)
        // if (nameLowercase.includes(searchToLower)) {
        if (nameLowercase.startsWith(searchToLower)) {
          return true
        }
      }
      // if (_.get(item, 'country.nameLowercase', '').include(_.toLower(search))) {
      //   return true
      // }
      return false
      // return value != null &&
      //   search != null &&
      //   typeof value === 'string' &&
      //   value.toString().toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1
    },
  },
}
</script>
