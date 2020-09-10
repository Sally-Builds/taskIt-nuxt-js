<template>
  <v-row align="center" justify="center" style="height: auto;">
    <v-card
      class="ma-3 pa-6 animate__animated animate__fadeInRight"
      width="350px"
    >
      <v-row>
        <v-col class="ma-3 pa-6 text-center success--text">
          Change Password
          <v-icon color="success"> mdi-lock </v-icon>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="currentPassword"
            label="Current Password"
            type="password"
            outlined
            shaped
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            outlined
            shaped
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="confirmPassword"
            label="Confirm Password"
            type="password"
            outlined
            shaped
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="text-center">
          <v-btn text color="primary" @click="updatePassword">Change</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    async updatePassword() {
      try {
        const data = {
          currentPassword: this.currentPassword,
          password: this.password,
          confirmPassword: this.confirmPassword,
        };
        await this.$axios({
          method: "PATCH",
          url: "http://localhost:4000/api/v1/users/updatePassword",
          data,
        });
        await this.$auth.loginWith("local", {
          data: {
            email: this.$auth.user.email,
            password: data.password,
          },
        });
        this.$store.dispatch("getSnackbar", {
          message:
            "Password update successfull. Please You have to login again",
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
