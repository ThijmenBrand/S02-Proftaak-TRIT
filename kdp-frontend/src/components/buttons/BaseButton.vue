<template>
  <div class="btn btn-yellow">
    <p>{{ btnContent.toUpperCase() }}</p>
  </div>
</template>

<script lang="ts">
export default {
  name: "BaseButtom",
  props: {
    btnContent: String,
  },
};
</script>

<style>
</style>