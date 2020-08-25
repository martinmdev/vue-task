import _ from 'lodash'

class CovidApi {
  constructor($axios) {
    this.$axios = $axios
  }

  async getAll(queryParams = {}) {
    const data = await this.$axios.$get('/v3/covid-19/all', {params: queryParams})
    return data
  }

  async getAllCountries(queryParams = {}) {
    const data = await this.$axios.$get('/v3/covid-19/countries', {params: queryParams})
    return data
  }

  async getCountries(countryList = [], queryParams = {}) {
    var path = '/v3/covid-19/countries/'
    // https://disease.sh/v3/covid-19/countries/Bulgaria%2C%20US
    let csv = countryList.join(',')
    path += csv

    queryParams.strict = true

    const data = await this.$axios.$get(path, {params: queryParams})
    return data
  }

}

export default (context, inject) => {
  let $axios = context.$axios

  // Create a custom axios instance
  const customAxios = $axios.create()

  // https://disease.sh/v3/covid-19

  // Set baseURL to something different
  customAxios.setBaseURL('https://disease.sh')

  let api = new CovidApi(customAxios)

  context.$api = api

  // Inject to context as $api
  inject('api', api)
}
