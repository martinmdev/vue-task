<template>
  <div>
    <slot name="header">
      <h1>{{ title }}</h1>
    </slot>
    <slot name="updateLinks">
      <v-row>
        <v-btn small to="/covid" nuxt>Home</v-btn>
        <v-btn small @click="updateStats()">Today</v-btn>
        <v-btn small @click="updateStats({yesterday:true})">Yesterday</v-btn>
        <v-btn small @click="updateStats({twoDaysAgo:true})">Two days ago</v-btn>
      </v-row>
    </slot>
    <slot
      v-if="country && !country2"
      name="autocomplete">
      <v-row>
        <v-autocomplete
          v-model="country2"
          :items="countryNames"
          :loading="isLoading"
          label="Compare to"
          placeholder="Start typing to Search"
          search-input.sync="search"
          no-filter
          hide-no-data
          hide-selected
          @change="redirectToCompare"
        ></v-autocomplete>
      </v-row>
    </slot>
    <slot name="goback"
          v-if="country2"
    >
      <v-btn small @click="redirectToCountry()">Go back</v-btn>
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
  </div>
  <!--    </v-flex>-->
  <!--  </v-layout>-->
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
      country2: null,
      search: null,
    }
  },
  mounted() {
    this.title = 'All stats'
    // this.asyncUpdateAll()
    // this.asyncUpdateAllCountries()
    this.updateStats()
  },
  methods: {

    async asyncUpdateAll(queryParams = {}) {
      const data = await this.$api.getAll(queryParams)
      this.updateCountryNames(data)
      // this.preview = data
      this.cardStats = data
    },

    async asyncUpdateAllCountries(queryParams = {}) {
      const data = await this.$api.getAllCountries(queryParams)
      this.tableStats = data
    },

    async updateStats(queryParams = {}) {
      this.asyncUpdateAll(queryParams)
      this.asyncUpdateAllCountries(queryParams)
    },

    async asyncUpdateCountryNames(queryParams = {}) {
      const data = await this.$api.getAllCountries(queryParams)
      this.updateCountryNames(data)
    },

    updateCountryNames(data) {
      // console.log('updateCountryNames data %o', data);

      // var pickProps = [
      //   "country",
      // ]
      var countryNames = []

      _.forEach(data, function (value) {
        // var entry = _.pick(value, pickProps);
        var entry = value.country
        countryNames.push(entry)
      })

      // console.log('countryNames %o', countryNames);

      this.countryNames = countryNames
    },

    async asyncUpdateCountryData(queryParams = {}) {
      var countryList = [this.country]
      if (this.country2) {
        countryList.push(this.country2)
      }
      const data = await this.$api.getCountries(countryList)
      console.log('asyncUpdateCountryData %o', data)
      if (!_.isArray(data)) {
        this.cardStats = data
        this.showCompare = false
      } else {
        this.compareStats = data
        this.showCompare = true
      }
    },

    redirectToCountry(event) {
      console.log('redirectToCountry %o', event);

      var location = {
        name: 'covid-country', params: {
          country: this.country,
        }
      }

      this.$router.replace(location)
    },

    redirectToCompare(event) {
      console.log('redirectToCompare %o', event);

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
