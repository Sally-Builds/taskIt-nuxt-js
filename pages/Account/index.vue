<template>
  <v-container>
    <!-- <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="name"
          label="full Name"
          :placeholder="$auth.user.name"
          outlined
          shaped
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="email"
          label="email"
          outlined
          shaped
        ></v-text-field>
      </v-col>
      <v-btn @click="updateInfo">change</v-btn>
    </v-row> -->
    <v-row align="center" justify="center">
      <v-col md="4">
        <UpdateUser />
      </v-col>
      <v-col md="4">
        <ChangePassword />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UpdateUser from "@/components/User/UpdateUser";
import ChangePassword from "@/components/User/ChangePassword";
export default {
  title: "User Account",
  components: {
    UpdateUser,
    ChangePassword,
  },
  layout: "user",
  data() {
    return {
      // name: "",
      email: "",
    };
  },
  computed: {
    userDetails() {
      return {
        fullname: this.$auth.user.name,
        email: this.$auth.user.email,
      };
    },
  },
  methods: {
    async updateInfo() {
      try {
        // var data = {
        //   name: this.fullName,
        // };
        const res = await this.$axios({
          method: "PATCH",
          url: "http://localhost:4000/api/v1/users/updateMe",
          data: {
            name: this.name,
          },
        });
        console.log(res);
        this.$auth.user.name = this.name;
        this.name = "";
      } catch (e) {
        console.log(e.response.data.message);
      }
    },
  },
};
</script>
