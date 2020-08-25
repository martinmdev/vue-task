<script>
import _ from 'lodash'

export default {
  props: [
    'stats',
    'tableStats',
    'compareStats'
  ],
  computed:{
    getComparisonTableHeaders() {
      var headers = [
        {
          text: 'prop name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {text: 'value1', value: 'value1'},
        {text: 'value2', value: 'value2'},
      ]

      return headers
    },

    getComparisonTableItems() {
      var stats = this.compareStats
      console.log('getComparisonTableItems stats %o', stats);


      var items = []

      var itemNames = [
        "country",
        "cases",
        "todayCases",
        "deaths",
        "todayDeaths",

        "casesPerOneMillion",
        "deathsPerOneMillion",
        "testsPerOneMillion",
        "oneCasePerPeople",
        "oneDeathPerPeople",
        "oneTestPerPeople",
        "activePerOneMillion",
        "recoveredPerOneMillion",
        "criticalPerOneMillion",
      ]

      var pickProps = this.getPickProps()

      _.forEach(itemNames, function (propName) {
        var item = {
          name: propName,
          value1: stats[0][propName],
          value2: stats[1][propName],
        }

        items.push(item)
      })

      console.log('getComparisonTableItems %o', items);

      return items

    },

  },
  methods: {

    getStatsCardsData() {
      var data = []
      var stats = _.pick(this.stats, this.getPickProps());
      _.forEach(stats, function (value, key) {
        var elem = {
          name: key,
          value: value,
        }

        data.push(elem)
      })

      return data
    },

    getTableHeaders() {
      // "country",
      //   // "countryInfo",
      //   "cases",
      //   "todayCases",
      //   "deaths",
      //   "todayDeaths",

      var headers = [
        {
          text: 'country',
          align: 'start',
          sortable: false,
          value: 'country',
        },
        {text: 'cases', value: 'cases'},
        {text: 'todayCases', value: 'todayCases'},
        {text: 'deaths', value: 'deaths'},
        {text: 'todayDeaths)', value: 'todayDeaths'},
      ]

      return headers
    },

    getTableItems() {
      var items = []

      var pickProps = this.getPickProps()

      _.forEach(this.tableStats, function (value, key) {
        var item = _.pick(value, pickProps);
        items.push(item)
      })

      return items

    },

    getPickProps() {
      var pickProps = [
        // "updated",
        "country",
        // "countryInfo",
        "cases",
        "todayCases",
        "deaths",
        "todayDeaths",
        // "recovered",
        // "todayRecovered",
        // "active",
        // "critical",
        // "casesPerOneMillion",
        // "deathsPerOneMillion",
        // "tests",
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



  }
}
</script>
