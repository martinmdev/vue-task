<script>
import BasePage from "@/components/BasePage";


export default {
  extends: BasePage,
  mounted() {
    this.country = this.$route.params.country

    this.title = this.country

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
