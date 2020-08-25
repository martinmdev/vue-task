<template>
  <v-row>
    <v-col>
      <slot name="header">
        <v-row class="mb-4">
          <h1>{{ title }}</h1>
        </v-row>
      </slot>
      <slot name="updateLinks">
        <v-row>
          <v-btn small to="/covid" nuxt class="mr-4">Dashboard</v-btn>
          <v-btn v-if="country2" small :to="{name: 'covid-country', params: {country: country,}}" nuxt
                 class="mr-4"
          >Go back to Detailed view: {{ country }}
          </v-btn>
          <v-btn small @click="updateStats()">Today</v-btn>
          <v-btn small @click="updateStats({yesterday:true})">Yesterday</v-btn>
          <v-btn small @click="updateStats({twoDaysAgo:true})">Two days ago</v-btn>
        </v-row>
      </slot>
      <slot
        v-if="country && !country2"
        name="autocomplete">
        <v-row>
          <v-col>
            <v-autocomplete
              v-model="country2"
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
          :stats="cardStats"
        ></card-stats>
      </slot>
      <slot name="compareStats"
            v-else
      >
        <compare-stats
          :compare-stats="compareStats"
        ></compare-stats>
      </slot>
      <slot name="tableStats"
            v-if="!country && !country2"
      >
        <table-stats
          :table-stats="tableStats"
        ></table-stats>
      </slot>
    </v-col>
  </v-row>
</template>

<script>

import CardStats from "@/components/CardStats";
import TableStats from "@/components/TableStats";
import CompareStats from "@/components/CompareStats";

export default {
  components: {CompareStats, TableStats, CardStats},
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
      autoCompleteItems: [],
      country2: null,
      search: null,
    }
  },
  mounted() {
    this.title = 'Dashboard'
    this.country = null
    this.country2 = null
    // this.asyncUpdateAll()
    // this.asyncUpdateAllCountries()
    this.updateStats()
  },
  // computed: {
  //   computedAutocompleteItems() {
  //     var items = _.cloneDeep([], this.countryNames)
  //     items = _.without(items, this.country);
  //     return items
  //   },
  // },
  methods: {

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

    async updateStats(queryParams = {}) {
      console.log('BasePage updateStats')
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
      this.autoCompleteItems = _.without(countryNames, this.country);
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

    redirectToCountry(event) {
      // console.log('redirectToCountry %o', event);

      var location = {
        name: 'covid-country', params: {
          country: this.country,
        }
      }

      this.$router.replace(location)
    },

    redirectToCompare(event) {
      // console.log('redirectToCompare %o', event);

      var location = {
        name: 'covid-country-compare', params: {
          country: this.country,
          compare: this.country2,
        }
      }

      this.$router.replace(location)
    },

  }
}
</script>
