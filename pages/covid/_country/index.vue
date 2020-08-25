<script>
import BasePage from "@/components/BasePage";


export default {
  extends: BasePage,
  mounted() {
    this.country = this.$route.params.country
    this.country2 = null

    this.title = 'Detailed View: ' + this.country

    this.updateStats()
  },
  methods: {

    async updateStats(queryParams = {}) {
      console.log('country updateStats %o', queryParams)
      this.asyncUpdateCountryData(queryParams)
      this.asyncUpdateCountryNames(queryParams)
    },


  }
}
</script>
