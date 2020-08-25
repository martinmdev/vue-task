<script>
import CountryPage from "@/components/CountryPage";


export default {
  extends: CountryPage,
  methods: {
    initParameters(){
        this.country = this.$route.params.country
        this.country2 = null

        this.title = 'Detailed View: ' + this.country
    },
  }
}
</script>
