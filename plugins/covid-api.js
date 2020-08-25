import _ from 'lodash'

class CovidApi {
  constructor($axios) {
    this.$axios = $axios

    // Set baseURL to something different
    this.$axios.setBaseURL('https://disease.sh')
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

  let api = new CovidApi(customAxios)

  context.$api = api

  // Inject to context as $api
  inject('api', api)
}
