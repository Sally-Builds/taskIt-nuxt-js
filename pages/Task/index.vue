<template>
  <v-container>
    <v-row>
      <v-col>
        <v-row align="center" justify="center" style="height: 300px;">
          <v-card class="animate__animated animate__bounceInUp">
            <v-card-title>
              <v-row>
                <v-col cols="12" class="text-center indigo--text">
                  Create Task
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
                    label="Task name"
                    outlined
                    shaped
                  ></v-text-field>
                  <v-btn
                    class="white--text text-center"
                    outlined
                    color="green"
                    @click="createTask"
                    >Create</v-btn
                  >
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  title: "Create Task",
  layout: "user",
  data() {
    return {
      task: "",
    };
  },
  methods: {
    async createTask() {
      try {
        const res = await this.$axios.post(
          "http://localhost:4000/api/v1/tasks",
          {
            name: this.task,
          }
        );
        const newTask = res.data.data.newTask;
        this.$auth.user.tasks.push(newTask);
        this.$store.dispatch("getSnackbar", {
          message: "Task Created Successfully",
        });
        this.task = "";
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
