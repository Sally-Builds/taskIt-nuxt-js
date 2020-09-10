<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-row align="center" justify="center" style="height: auto;">
          <v-card
            class="ma-3 pa-6 animate__animated animate__bounceInRight"
            width="350px"
          >
            <v-row>
              <v-col class="ma-3 pa-6">
                <v-img text-center src="/images/logo.png"></v-img>
              </v-col>
            </v-row>
            <div>
              <v-text-field
                v-model="email"
                label="email"
                outlined
                shaped
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="password"
                outlined
                shaped
              ></v-text-field>
              <v-divider></v-divider>
              <div class="mt-4 mb-4">
                <v-row justify="space-around">
                  <v-btn text class="font-italic" style="font-size: 9px;"
                    >forgot password</v-btn
                  >
                  <v-btn dark outlined color="white" @click="login"
                    >Login</v-btn
                  >
                </v-row>
              </div>
              <v-divider></v-divider>
              <div class="mt-4">
                <v-row justify="space-around">
                  <v-btn text class="font-italic" style="font-size: 9px;"
                    >Don't have an account</v-btn
                  >
                  <v-btn
                    class="white--text"
                    text
                    color="primary"
                    nuxt
                    to="/register"
                    >Register</v-btn
                  >
                </v-row>
              </div>
            </div>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  middleware: "loggedIn",
  title: "Home",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const formData = {
          email: this.email,
          password: this.password,
        };
        await this.$auth.loginWith("local", {
          data: formData,
        });
        this.$router.push("/dashboard");
        this.$store.dispatch("getSnackbar", {
          message: `Welcome on board ${this.$auth.user.name}!!!`,
        });
      } catch (e) {
        this.$store.dispatch("getSnackbar", {
          color: "red",
          message: e.response.data.message,
        });
      }
    },
  },
};
</script>
