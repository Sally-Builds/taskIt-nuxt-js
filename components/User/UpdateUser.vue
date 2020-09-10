<template>
  <v-row align="center" justify="center" style="height: auto;">
    <v-card
      class="ma-3 pa-6 animate__animated animate__fadeInLeft"
      width="350px"
    >
      <v-row>
        <v-col class="ma-3 pa-6 text-center success--text">
          User Details
          <v-icon color="success"> mdi-card-account-details </v-icon>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="name"
            :placeholder="$auth.user.name"
            label="full Name"
            outlined
            shaped
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="email"
            :placeholder="$auth.user.email"
            label="email"
            outlined
            shaped
          ></v-text-field>
        </v-col>
        <v-col>
          <v-row>
            <v-col md="2">
              <v-avatar>
                <v-img
                  :src="`http://127.0.0.1:4000/images/${$auth.user.photo}`"
                ></v-img>
              </v-avatar>
            </v-col>
            <v-col md="10">
              <v-file-input
                v-model="file"
                accept="image/*"
                label="Upload Profile Picture"
              ></v-file-input>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" class="text-center">
          <v-btn text color="primary" @click="updateInfo">Change</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      file: [],
    };
  },
  methods: {
    async updateInfo() {
      try {
        var data = {
          name: this.$auth.user.name,
          email: this.$auth.user.email,
          photo: this.$auth.user.photo,
        };
        if (this.name !== "") {
          data.name = this.name;
        }
        if (this.email !== "") {
          data.email = this.email;
        }
        if (this.file !== "") {
          data.photo = this.file;
        }
        let formData = new FormData();
        formData.set("name", data.name);
        formData.set("email", data.email);
        formData.append("photo", data.photo);

        const res = await this.$axios({
          method: "PATCH",
          url: "http://localhost:4000/api/v1/users/updateMe",
          data: formData,
        });
        if (this.name !== "") {
          this.$auth.user.name = this.name;
        }
        if (this.email !== "") {
          this.$auth.user.email = this.email;
        }
        if (this.file !== "") {
          this.$auth.user.photo = res.data.data.user.photo;
        }
        this.name = "";
        this.email = "";
        this.file = [];
        this.$store.dispatch("getSnackbar", {
          message: `Update Successful!!!`,
        });
      } catch (e) {
        this.$store.dispatch("getSnackbar", {
          message: e.response.data.message,
          color: "error",
        });
        console.log(e);
      }
    },
  },
};
</script>
