<template>
  <v-row align="center" justify="center" style="height: 300px;">
    <v-card class="animate__animated animate__fadeInLeft">
      <v-card-title>
        <v-row>
          <v-col cols="12" class="text-center indigo--text">
            Edit Task
          </v-col>
          <v-col class="indigo--text">
            <v-divider class="primary"></v-divider>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col class="text-center">
            <v-text-field
              v-model="task"
              label="Search Task name"
              outlined
              shaped
            ></v-text-field>
            <v-btn
              class="white--text text-center"
              outlined
              color="green"
              @click="findTask"
              >Search</v-btn
            >
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      task: "",
    };
  },
  methods: {
    async findTask() {
      try {
        const slug = this.task.split(" ").join("-").toLowerCase();
        const res = await this.$axios.get(
          `http://localhost:4000/api/v1/tasks/${slug}`
        );
        const task = res.data.data.task;
        this.$store.commit("updateStatus", task.status);
        this.$store.dispatch("setTask", {
          name: task.name,
          id: task.id,
        });
        this.$store.dispatch("getSnackbar", {
          message: "Searching!!!",
        });
        this.task = "";
        var found = this.$store.getters.getTask.id;
        if (found) {
          this.$store.dispatch("getSnackbar", {
            message: "Task found",
          });
        }
      } catch (e) {
        this.$store.dispatch("getSnackbar", {
          color: "red",
          message: e.response.data.message,
        });
        console.log(e);
      }
    },
  },
};
</script>
