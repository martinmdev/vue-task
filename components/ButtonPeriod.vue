<template>
  <v-btn
    small
    @click="onClick"
    :color="selected ? 'primary' : undefined"
    :depressed="selected"
  >
    <slot></slot>
  </v-btn>
</template>
<script>
export default {
  computed: {
    selected() {
      return this.currentPeriod == this.period
    },
  },
  props: [
    'period',
    'currentPeriod',
    'label',
  ],
  methods: {
    onClick() {
      this.$emit('clicked', this.period)
    },
  }
}
</script>
