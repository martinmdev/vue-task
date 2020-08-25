<template>
  <v-card>
    <v-card-title>
      {{ title }}
    </v-card-title>
    <v-card-text>
      <slot name="titleSelect">
        {{ text }}
      </slot>

    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: [
    'title',
    'text',
  ],
}
</script>
