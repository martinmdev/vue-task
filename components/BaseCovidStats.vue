<script>
import _ from 'lodash'

const humanizeDuration = require("humanize-duration");

export default {
  props: [
    'statsData',
  ],
  methods: {

    getPickProps() {
      // "countryInfo": {
      //   "_id": 4,
      //     "iso2": "AF",
      //     "iso3": "AFG",
      //     "lat": 33,
      //     "long": 65,
      //     "flag": "https://disease.sh/assets/img/flags/af.png"
      // },

      var pickProps = [
        // "updated",
        "country",
        // "countryInfo",
        "updated",
        "cases",
        // "todayCases",
        "deaths",
        // "todayDeaths",
        "recovered",
        // "todayRecovered",
        "active",
        "critical",
        "casesPerOneMillion",
        "deathsPerOneMillion",
        "tests",
        // "testsPerOneMillion",
        // "population",
        // "continent",
        // "oneCasePerPeople",
        // "oneDeathPerPeople",
        // "oneTestPerPeople",
        // "activePerOneMillion",
        // "recoveredPerOneMillion",
        // "criticalPerOneMillion",
      ]
      return pickProps
    },

    getPropertyToLabelMap() {
      var map = {
        "country": "Country",
        "updated": "Last updated",
        "cases": "Total cases",
        "todayCases": "Cases today",
        "deaths": "Total deaths",
        "todayDeaths": "Deaths today",
        "recovered": "Total Recovered",
        "todayRecovered": "Recovered today",
        "active": "Total active",
        "critical": "Total critical",
        "casesPerOneMillion": "Cases per million",
        "deathsPerOneMillion": "Deaths per million",
        "tests": "Total tests",
        "testsPerOneMillion": "Tests per million",
        "population": "Population",
        "continent": "Continent",
        "oneCasePerPeople": "One case per people",
        "oneDeathPerPeople": "One death per people",
        "oneTestPerPeople": "One test per people",
        "activePerOneMillion": "Active per million",
        "recoveredPerOneMillion": "Recovered per million",
        "criticalPerOneMillion": "Critical per million",
        "affectedCountries": "Affected countries",
      }

      return map
    },

    getPropertyFilterMap() {
      var map = {
        // "country": "Country",
        "updated": function (value) {
          var now = _.now()
          var diff = now - value
          var humanizedDuration = humanizeDuration(diff);
          // var seconds = diff / 1000
          // var minutes = seconds / 60
          //
          // return seconds + ' seconds ago'
          return humanizedDuration + ' ago'
        },
        // "cases": "Total cases",
        // "todayCases": "Cases today",
        // "deaths": "Total deaths",
        // "todayDeaths": "Deaths today",
        // "recovered": "Total Recovered",
        // "todayRecovered": "Recovered today",
        // "active": "Total active",
        // "critical": "Total critical",
        // "casesPerOneMillion": "Cases per million",
        // "deathsPerOneMillion": "Deaths per million",
        // "tests": "Total tests",
        // "testsPerOneMillion": "Tests per million",
        // "population": "Population",
        // "continent": "Continent",
        // "oneCasePerPeople": "One case per people",
        // "oneDeathPerPeople": "One death per people",
        // "oneTestPerPeople": "One test per people",
        // "activePerOneMillion": "Active per million",
        // "recoveredPerOneMillion": "Recovered per million",
        // "criticalPerOneMillion": "Critical per million",
        // "affectedCountries": "Affected countries",
      }

      return map
    },

    formatPropValue(propName, value) {
      var filterMap = this.getPropertyFilterMap()

      var filteredValue = value
      if (propName in filterMap) {
        filteredValue = filterMap[propName](filteredValue)
      }

      return filteredValue
    },

    formatAllProps(object) {
      var self = this
      var filterMap = this.getPropertyFilterMap()

      _.forEach(filterMap, function (callback, propName) {
        if (_.has(object, propName)) {
          object[propName] = callback(_.get(object, propName))
        }
      })
    }

  }
}
</script>
