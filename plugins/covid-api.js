import _ from 'lodash'

class CovidApi {
  constructor($axios) {
    this.$axios = $axios

    // Set baseURL to something different
    this.$axios.setBaseURL('https://disease.sh')
  }

  async getAll(queryParams = {}) {
    var path = '/v3/covid-19/all'
    const data = await this.get(path, queryParams)
    // const data = await this.$axios.$get(, {params: queryParams})
    return data
  }

  async getAllCountries(queryParams = {}) {
    // const data = await this.$axios.$get(, {params: queryParams})
    var path = '/v3/covid-19/countries'
    const data = await this.get(path, queryParams)
    return data
  }

  async getCountries(countryList = [], queryParams = {}) {
    var path = '/v3/covid-19/countries/'
    let csv = countryList.join(',')
    path += csv

    queryParams.strict = true

    // const data = await this.$axios.$get(path, {params: queryParams})
    const data = await this.get(path, queryParams)
    return data
  }

  async get(path, queryParams = {}) {
    // console.log('get path %o', path)
    // console.log('get queryParams %o', queryParams)
    // const data1 = await this.$axios.get(path, {params: queryParams})
    // console.log('data1 %o', data1)
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
