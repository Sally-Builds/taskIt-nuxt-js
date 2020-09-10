<template>
  <v-card>
    <v-app-bar app dark>
      <v-app-bar-nav-icon
        color="primary"
        @click.native="sideNav = !sideNav"
      ></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-avatar tile>
        <v-img text-center src="/images/logo.png"></v-img>
      </v-avatar>
    </v-app-bar>
    <v-navigation-drawer v-if="sideNav" v-model="sideNav" app>
      <v-list-item>
        <v-list-item-avatar>
          <!-- src="https://i.pinimg.com/originals/7d/1a/3f/7d1a3f77eee9f34782c6f88e97a6c888.jpg" -->
          <v-img
            :src="`http://127.0.0.1:4000/images/${$auth.user.photo}`"
          ></v-img>
          <!-- <v-img :src="photo"></v-img> -->
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="primary--text">
            {{ username }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
        <v-list-item v-for="item in items" :key="item.index">
          <v-btn text block nuxt :to="item.link" class="blue--text" light>
            <v-list-item-icon>
              <v-icon small>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="text-center" style="font-size: 11px;">
              {{ item.title }}
            </v-list-item-content>
          </v-btn>
        </v-list-item>
        <v-list-item>
          <!-- ----------------- -->
          <v-btn text block nuxt class="blue--text" light @click="logout">
            <v-list-item-icon>
              <v-icon small>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="text-center" style="font-size: 11px;">
              Logout
            </v-list-item-content>
          </v-btn>
          <!-- ---------- -->
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      sideNav: false,
      items: [
        { link: "/dashboard", title: "Dashboard", icon: "mdi-account" },
        { link: "/task", title: "Create Task", icon: "mdi-grease-pencil" },
        { link: "/edit", title: "Edit Task", icon: "fa fa-edit" },
        { link: "/account", title: "my Account", icon: "mdi-account" },
      ],
    };
  },
  computed: {
    username() {
      return this.$auth.user.name.split(" ")[0];
    },
    photo() {
      return this.$store.getters.getPhoto;
    },
  },
  methods: {
    async logout() {
      this.$store.dispatch("getSnackbar", {
        message: `Goodbye!!!. Hope to see you soon`,
      });
      this.$router.push("/");
      await this.$auth.logout();
    },
  },
};
</script>
