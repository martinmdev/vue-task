<template>
  <v-row>
    <v-col
      v-for="(item, index) in getComputedStatsCardsData"
      :key="index"
      cols="6"
    >
      <card-simple
        :title="item.name"
        :text="item.value"
      >
        <template
          v-if="item.propName === 'country'"
          v-slot:titleSelect
        >
          <v-select
            :items="countryOptionItems"
            :value="country"
            dense
            outlined
            @change="onChange"
          ></v-select>
        </template>
      </card-simple>
    </v-col>
  </v-row>
</template>
<script>
import BaseCovidStats from "@/components/BaseCovidStats";
import _ from 'lodash'
import CardSimple from "@/components/CardSimple";

export default {
  components: {CardSimple},
  extends: BaseCovidStats,
  props: [
    'countryOptionItems',
    'country',
  ],
  computed: {
    getComputedStatsCardsData() {
      var labelMap = this.getPropertyToLabelMap()
      var self = this

      var data = []
      var stats = _.pick(this.statsData, this.getPickProps());
      _.forEach(stats, function (value, key) {
        var filteredValue = self.formatPropValue(key, value)
        var elem = {
          propName: key,
          name: labelMap[key],
          value: filteredValue,
        }

        data.push(elem)
      })

      // console.log('getComputedStatsCardsData %o', data)

      return data
    },
  },
  methods: {
    onChange(event) {
      this.$emit('country:changed', event)
    },
  },
}
</script>
