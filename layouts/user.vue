<template>
  <v-app app dark>
    <v-snackbar
      v-model="snackbar.show"
      bottom
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
    <Navigation />
    <v-main app>
      <nuxt />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Footer from "@/components/footer";
import Navigation from "@/components/Navigation";
export default {
  middleware: "auth",
  components: {
    Navigation,
    Footer,
  },
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
  --animate-duration: 2000ms;
  /* --animate-delay: 0.9s; */
}
</style>
