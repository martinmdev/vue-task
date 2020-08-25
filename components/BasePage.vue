<template>
  <v-layout>
    <v-row>
      <v-col>
        <!--        <slot name="header">-->
        <v-row class="mb-4">
          <h1>{{ title }}</h1>
        </v-row>
        <!--        </slot>-->
        <!--        <slot name="updateLinks">-->
        <v-row>
          <v-col cols="6">
            <v-breadcrumbs
              :items="breadCrumbItems"
              divider=">>"
            ></v-breadcrumbs>
          </v-col>
          <v-col>
            <div class="float-right">
              <button-period :current-period="period" period="1" @clicked="updatePeriod">Today</button-period>
              <button-period :current-period="period" period="2" @clicked="updatePeriod">Yesterday</button-period>
              <button-period :current-period="period" period="3" @clicked="updatePeriod">Two days ago</button-period>
            </div>
          </v-col>
        </v-row>
        <!--        </slot>-->
        <slot
          v-if="country && !country2"
          name="autocomplete">
          <v-row>
            <v-col>
              <v-autocomplete
                v-model="autoCompleteCountry2"
                :items="autoCompleteItems"
                :loading="isLoading"
                label="Compare to another country"
                placeholder="Start typing to Search"
                search-input.sync="search"
                no-filter
                hide-no-data
                hide-selected
                @change="redirectToCompare"
              ></v-autocomplete>
            </v-col>
          </v-row>
        </slot>
        <slot name="cardStats"
              v-if="!showCompare"
        >
          <card-stats
            :stats-data="cardStats"
            :country-option-items="countryOptionItems"
            :country="country"
            v-on:country:changed="countryChanged"
          ></card-stats>
        </slot>
        <slot name="compareStats"
              v-else
        >
          <compare-stats
            :stats-data="compareStats"
          ></compare-stats>
        </slot>
        <slot name="tableStats"
              v-if="!country && !country2"
        >
          <table-stats
            :stats-data="tableStats"
          ></table-stats>
        </slot>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>

import CardStats from "@/components/CardStats";
import TableStats from "@/components/TableStats";
import CompareStats from "@/components/CompareStats";
import ButtonPeriod from "@/components/ButtonPeriod";

export default {
  components: {ButtonPeriod, CompareStats, TableStats, CardStats},
  layout: 'covid',
  data() {
    var cardStats = []
    var compareStats = []
    var tableStats = []

    return {
      preview: 'preview',
      cardStats: cardStats,
      compareStats: compareStats,
      showCompare: false,
      tableStats: tableStats,
      title: null,
      isLoading: false,
      country: null,
      countryNames: [],
      countryOptionItems: [],
      autoCompleteItems: [],
      breadCrumbItems: [],
      country2: null,
      autoCompleteCountry2: null,
      search: null,
      period: 1,
    }
  },
  mounted() {
    this.initParameters()

    this.setBreadCrumbItems()

    this.updateStats()
  },
  methods: {
    initParameters() {
      this.title = 'Dashboard'
      this.country = null
      this.country2 = null
    },

    setBreadCrumbItems() {
      var items = []

      items.push({
        text: 'Dashboard',
        disabled: false,
        exact: true,
        to: {name: 'index'}
      })

      if (this.country) {
        items.push({
          text: 'Detailed view: ' + this.country,
          exact: true,
          disabled: false,
          to: {name: 'country', params: {country: this.country,}}
        })
      }

      if (this.country2) {
        items.push({
          text: 'Comparison view: ' + this.country2,
          exact: true,
          disabled: true,
          to: {
            name: 'country-compare', params: {
              country: this.country,
              compare: this.country2,
            }
          }
        })
      }

      this.breadCrumbItems = items
    },

    async asyncUpdateAll(queryParams = {}) {
      const data = await this.$api.getAll(queryParams)
      data['country'] = 'Global'
      // this.preview = data
      this.cardStats = data
    },

    async asyncUpdateAllCountries(queryParams = {}) {
      const data = await this.$api.getAllCountries(queryParams)
      this.updateCountryNames(data)

      this.tableStats = data
    },

    async updatePeriod(period) {
      // console.log('updatePeriod %o', period)
      this.period = period

      var periodQueryParams = {
        '1': {},
        '2': {yesterday: true},
        '3': {twoDaysAgo: true},
      }

      this.updateStats(periodQueryParams[period])
    },

    async updateStats(queryParams = {}) {
      // console.log('BasePage updateStats')
      this.asyncUpdateAll(queryParams)
      this.asyncUpdateAllCountries(queryParams)
    },

    async asyncUpdateCountryNames(queryParams = {}) {
      const data = await this.$api.getAllCountries(queryParams)
      this.updateCountryNames(data)
    },

    updateCountryNames(data) {
      var countryNames = []

      _.forEach(data, function (value) {
        countryNames.push(value.country)
      })

      this.countryNames = countryNames
      this.countryOptionItems = this.getCountryOptionItems(countryNames)
      this.autoCompleteItems = _.without(countryNames, this.country);
    },

    getCountryOptionItems(countryNames) {
      var items = []

      items.push({
        value: null,
        text: 'Global'
      })

      _.forEach(countryNames, function (name) {
        items.push({
          value: name,
          text: name,
        })
      })

      return items
    },

    async asyncUpdateCountryData(queryParams = {}) {
      var countryList = [this.country]
      if (this.country2) {
        countryList.push(this.country2)
      }
      const data = await this.$api.getCountries(countryList, queryParams)
      // console.log('asyncUpdateCountryData %o', data)
      if (!_.isArray(data)) {
        this.cardStats = data
        this.showCompare = false
      } else {
        this.compareStats = data
        this.showCompare = true
      }
    },

    redirectToCountry(country) {
      // console.log('redirectToCountry %o', country);

      if (country === null) {
        var location = {
          name: 'index'
        }
      } else {

        var location = {
          name: 'country', params: {
            country: country,
          }
        }
      }

      this.$router.replace(location)
    },

    redirectToCompare(event) {
      // console.log('redirectToCompare %o', event);

      var location = {
        name: 'country-compare', params: {
          country: this.country,
          compare: this.autoCompleteCountry2,
        }
      }

      this.$router.replace(location)
    },

    countryChanged(event) {
      // console.log('countryChanged %o', event);
      this.redirectToCountry(event)
    },

  }
}
</script>
