<script>
import BasePage from "@/components/BasePage";


export default {
  extends: BasePage,
  methods: {
    async updateStats(queryParams = {}) {
      // console.log('country updateStats %o', queryParams)
      this.asyncUpdateCountryData(queryParams)
      this.asyncUpdateCountryNames(queryParams)
    },
  }
}
</script>
