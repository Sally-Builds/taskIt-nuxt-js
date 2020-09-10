<template>
  <v-row align="center" justify="center" style="height: auto;">
    <v-card class="ma-3 pa-6 animate__animated animate__fadeInUp" width="350px">
      <v-row>
        <v-col class="ma-3 pa-6 text-center success--text">
          Completed tasks
          <v-icon color="success"> mdi-check </v-icon>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row align="center" justify="center">
        <v-list>
          <v-list-item v-for="comp in tasks" :key="comp[0]">
            <v-btn text block class="green--text" @click="editTask(comp)"
              >{{ comp }}
            </v-btn>
          </v-list-item>
        </v-list>
      </v-row>
    </v-card>
  </v-row>
</template>

<script>
export default {
  computed: {
    tasks() {
      return this.$store.getters.completedTasks.top5;
    },
  },
  methods: {
    async editTask(task) {
      const slug = task.split(" ").join("-").toLowerCase();
      const res = await this.$axios.get(
        `http://localhost:4000/api/v1/tasks/${slug}`
      );
      const taskit = res.data.data.task;
      this.$store.commit("updateStatus", taskit.status);
      this.$store.dispatch("setTask", {
        name: taskit.name,
        id: taskit.id,
      });
      this.$router.push(`/edit/${slug}`);
    },
  },
};
</script>
