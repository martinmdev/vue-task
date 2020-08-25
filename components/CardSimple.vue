<template>
  <v-card>
    <v-row>

<!--      <v-col-->
<!--        cols="2"-->
<!--      >-->
<!--        <v-container>-->
<!--          <v-row align="center">-->
<!--            <v-col align-self="center">-->
<!--              <v-icon-->
<!--              >mdi-domain</v-icon>-->
<!--            </v-col>-->
<!--          </v-row>-->
<!--        </v-container>-->
<!--      </v-col>-->

      <v-col>
        <v-card-title>
          {{ title }}
        </v-card-title>
        <v-card-text>
          <slot name="titleSelect">
            {{ text }}
          </slot>

        </v-card-text>
      </v-col>
    </v-row>
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
