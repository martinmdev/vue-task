<script>
import BasePage from "@/components/BasePage";


export default {
  extends: BasePage,
  mounted() {
    this.country = this.$route.params.country
    this.country2 = this.$route.params.compare

    this.title = this.country + ' vs ' + this.country2

    this.updateStats()
  },
  methods: {

    async updateStats(queryParams = {}) {
      this.asyncUpdateCountryData(queryParams)
      this.asyncUpdateCountryNames(queryParams)
    },


  }
}
</script>
