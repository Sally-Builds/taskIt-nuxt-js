<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="1">
        <v-btn class="animate__animated animate__bounceInLeft" text nuxt to="/">
          <v-icon>mdi-arrow-left</v-icon> <span>go back to login</span>
        </v-btn>
      </v-col>
      <v-col cols="12" md="12">
        <v-row align="center" justify="center" style="height: auto;">
          <v-card
            class="ma-3 pa-6 animate__animated animate__bounceInRight"
            width="350px"
          >
            <v-row>
              <v-col class="ma-3 pa-6 text-center">
                REGISTRATION
              </v-col>
            </v-row>
            <div>
              <v-text-field
                v-model="name"
                label="full name"
                outlined
                shaped
              ></v-text-field>
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
              <v-text-field
                v-model="confirmPassword"
                label="confirmPassword"
                outlined
                shaped
              ></v-text-field>
              <v-divider></v-divider>
              <div class="mt-4">
                <v-row justify="space-around">
                  <v-checkbox
                    v-model="check"
                    color="primary"
                    class="font-italic"
                    label="Do you agree to the terms and condition"
                  ></v-checkbox>
                  <v-btn
                    class="white--text"
                    text
                    color="primary"
                    @click="signup"
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
  title: "Register",
  data() {
    return {
      check: false,
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    async signup() {
      try {
        var formData = {
          name: this.name,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword,
        };
        await this.$axios.post(
          "http://localhost:4000/api/v1/users/signup",
          formData
        );
        await this.$auth.loginWith("local", {
          data: {
            email: formData.email,
            password: formData.password,
          },
        });
        this.$router.push("/dashboard");
        this.$store.dispatch("getSnackbar", {
          message: `Welcome on board ${this.$auth.user.name}!!! Brace yourself for your greatest achievement`,
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
