<template>
  <v-container>
    <v-row>
      <v-col md="12">
        <v-row align="center" justify="center">
          <div>
            <h3 class="mb-5 blue--text text-center">{{ $auth.user.name }}</h3>
            <v-divider></v-divider>
            <h6 class="mt-5 text-center indigo--text">
              This is a rundown of your tasks this week
            </h6>
          </div>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <TaskSummary />
      </v-col>
      <v-col cols="12" md="4">
        <Complete />
      </v-col>
      <v-col cols="12" md="4">
        <Incomplete />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Complete from "@/components/TaskStatus/Complete";
import Incomplete from "@/components/TaskStatus/Incomplete";
import TaskSummary from "@/components/TaskStatus/TaskSummary";
export default {
  title: "Dashboard",
  components: {
    Complete,
    Incomplete,
    TaskSummary,
  },
  layout: "user",
  data() {
    return {
      timer: "",
    };
  },
  computed: {
    name() {
      return this.$store.getters.getUser.fullName;
    },
  },
};
</script>
