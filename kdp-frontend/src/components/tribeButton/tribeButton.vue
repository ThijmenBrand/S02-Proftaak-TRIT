<template>
  <div>{{ tribeName }}</div>
</template>

<script lang="ts">
export default {
  name: "tribeButton",
  props: {
    tribeName: {
      type: String,
      required: true,
    },
  },
};
</script>

<style></style>
