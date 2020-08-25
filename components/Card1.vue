<template>
  <v-col cols="6">
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>{{ text }}</v-card-text>
    </v-card>
  </v-col>
</template>
<script>
export default {
  props: [
    'title',
    'text',
  ],
}
</script>
