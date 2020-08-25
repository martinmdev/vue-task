<script>
import CountryPage from "@/components/CountryPage";


export default {
  extends: CountryPage,
  methods: {
    initParameters() {
      this.country = this.$route.params.country
      this.country2 = this.$route.params.compare

      this.title = 'Comparison View: ' + this.country + ' vs ' + this.country2
    },
  }
}
</script>
