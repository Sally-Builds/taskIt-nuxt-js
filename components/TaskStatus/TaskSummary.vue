<template>
  <v-row align="center" justify="center" style="height: auto;">
    <v-card
      class="ma-3 pa-6 animate__animated animate__fadeInLeft"
      width="350px"
    >
      <v-row>
        <v-col class="ma-3 pa-6 text-center indigo--text">
          Task Summary
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row align="center" justify="center">
        <v-col cols="12">
          <div>
            <v-row align="center" justify="center" class="primary--text">
              Total Tasks &nbsp;
              <span class="display-2">{{ Summary.total }} </span>
            </v-row>
          </div>
        </v-col>
        <v-col>
          <v-divider></v-divider>
        </v-col>
        <v-col cols="12">
          <div>
            <v-row align="center" justify="center" class="success--text">
              completed Task &nbsp;
              <span class="display-2">{{ Summary.complete }} </span>
            </v-row>
          </div>
        </v-col>
        <v-col>
          <v-divider></v-divider>
        </v-col>
        <v-col cols="12">
          <div>
            <v-row align="center" justify="center" class="error--text">
              Incomplete Task &nbsp;
              <span class="display-2">{{ Summary.incomplete }} </span>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-row>
</template>

<script>
export default {
  computed: {
    Summary() {
      return {
        complete: this.$store.getters.completedTasks.comp.length,
        incomplete: this.$store.getters.inCompletedTasks.comp.length,
        total: this.$auth.user.tasks.length,
      };
    },
  },
};
</script>
