<template>
  <v-row align="center" justify="center" style="height: auto;">
    <v-card
      class="ma-3 pa-6 animate__animated animate__fadeInRight"
      width="350px"
    >
      <v-row>
        <v-col class="ma-3 pa-6 text-center success--text">
          Task name
          <v-icon color="success"> mdi-lock </v-icon>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="task.name"
            label="Task name"
            outlined
            shaped
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-checkbox
            v-model="stat"
            :label="`${stat ? 'Completed' : 'Incomplete'}`"
          ></v-checkbox>
        </v-col>
        <v-col cols="12" class="text-center">
          <v-btn text color="primary" @click="updated">Change</v-btn>
          <v-btn text color="error" @click="deleted">Delete</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-row>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    task: {
      get() {
        return this.$store.getters.getTask;
      },
      set(value) {
        this.$store.commit("editTask", value);
      },
    },
    stat: {
      get() {
        return this.$store.getters.getTaskStatus;
      },
      set(value) {
        this.$store.commit("updateStatus", value);
      },
    },
  },
  methods: {
    async updated() {
      try {
        const id = this.task.id;
        const slug = this.task.name.split(" ").join("-").toLowerCase();
        await this.$axios.patch(`http://localhost:4000/api/v1/tasks/${id}`, {
          name: this.task.name,
          status: this.stat,
          slug: slug,
        });
        this.$store.dispatch("getSnackbar", {
          message: "updated successfully!!!",
        });
        var index = this.$auth.user.tasks.findIndex((e) => e.id == id);
        this.$auth.user.tasks[index].name = this.task.name;
        this.$auth.user.tasks[index].status = this.stat;
        this.$auth.user.tasks[index].slug = slug;
        this.$store.dispatch("setTask", {
          name: "",
          status: false,
          id: null,
        });
      } catch (e) {
        this.$store.dispatch("getSnackbar", {
          color: "red",
          message: e.response.data.message,
        });
      }
    },
    async deleted() {
      try {
        const slug = this.task.name.split(" ").join("-").toLowerCase();
        await this.$axios.delete(`http://localhost:4000/api/v1/tasks/${slug}`);
        this.$store.dispatch("getSnackbar", {
          message: "deleted successfully!!!",
          color: "error",
        });
        this.$store.dispatch("setTask", {
          name: "",
          status: false,
          id: null,
        });
        let newTasks = this.$auth.user.tasks.filter((e) => {
          return e.slug !== slug;
        });
        this.$auth.user.tasks = newTasks;
      } catch (e) {
        console.log(e.response.data.message);
      }
    },
  },
};
</script>
