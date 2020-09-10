<template>
  <div class="text-center">
    <v-btn @click="snackbar = true">open</v-btn>
    {{  }}

  </div>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false,
      text: "My timeout is set to 2000.",
      timeout: 20000,
      multiLine: true,
    };
  },
};
</script>
