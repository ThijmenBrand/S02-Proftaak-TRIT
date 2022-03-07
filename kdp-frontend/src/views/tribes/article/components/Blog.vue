<template>
  <p>{{ articleContent }}</p>
</template>

<script lang="ts">
export default {
  name: "blog",
  props: {
    articleContent: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
</style>