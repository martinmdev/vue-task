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
        :headers="getComputedTableHeaders"
        :items="getComputedTableItems"
        :custom-filter="customFilter"
      >
        <template #item.country="{ value }">
          <nuxt-link
            :to="{name: 'country', params:{country:value.name}}"
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
  computed: {
    getComputedTableHeaders() {

      var tableItems = this.getComputedTableItems

      if (tableItems.length) {
        var labelMap = this.getPropertyToLabelMap()

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

      return headers
    },

    getComputedTableItems() {
      var items = []
      var self = this

      var pickProps = this.getPickProps()

      _.forEach(this.statsData, function (value, key) {
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
  },
  methods: {
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

      var nameLowercase = _.get(item, 'country.nameLowercase', '')

      if (_.isString(nameLowercase)) {
        var searchToLower = _.toLower(search)
        if (nameLowercase.startsWith(searchToLower)) {
          return true
        }
      }

      return false
    },
  },
}
</script>
