<template>
  <v-app app dark>
    <v-snackbar
      v-model="snackbar.show"
      top
      :color="snackbar.color"
      dark
      :timeout="5000"
      class="animate__animated animate__bounceInDown"
    >
      {{ snackbar.message }}

      <template v-slot:action="{ attrs }">
        <v-btn color="black" text v-bind="attrs" @click="snackbar.show = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <nuxt />
  </v-app>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    snackbar() {
      return this.$store.getters.getStatus;
    },
  },
};
</script>

<style>
:root {
  --animate-duration: 2500ms;
  --animate-delay: 1.5s;
}
</style>
