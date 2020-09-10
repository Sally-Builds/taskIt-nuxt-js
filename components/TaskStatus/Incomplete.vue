<template>
  <v-row align="center" justify="center" style="height: auto;">
    <v-card
      class="ma-3 pa-6 animate__animated animate__fadeInRight"
      width="350px"
    >
      <v-row>
        <v-col class="ma-3 pa-6 text-center error--text">
          InComplete tasks
          <v-icon color="error"> mdi-close-circle </v-icon>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row align="center" justify="center">
        <v-list>
          <v-list-item v-for="comp in tasks" :key="comp">
            <v-btn text block class="red--text" @click="editTask(comp)"
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
  data() {
    return {
      incomplete: [
        "Ski with Jane",
        "Tutor mark",
        "work on the Electric project",
        "Rehearsal for the Machbet play",
        "Date with the pretty model",
      ],
    };
  },
  computed: {
    tasks() {
      return this.$store.getters.inCompletedTasks.top5;
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
