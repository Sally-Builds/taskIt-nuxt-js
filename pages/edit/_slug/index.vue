<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <SearchTask />
      </v-col>
      <v-col cols="12" md="6">
        <EditTask v-if="task.name !== ``" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SearchTask from "@/components/TaskStatus/SearchTask";
import EditTask from "@/components/TaskStatus/EditTask";
export default {
  title: "Edit Task",
  components: {
    SearchTask,
    EditTask,
  },
  computed: {
    task() {
      return this.$store.getters.getTask;
    },
  },
  layout: "user",
};
</script>
