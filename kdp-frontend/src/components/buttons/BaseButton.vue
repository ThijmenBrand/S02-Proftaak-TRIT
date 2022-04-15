<template>
  <div class="btn" :class="'btn-'+color">
    <p>{{ btnContent.toUpperCase() }}</p>
  </div>
</template>

<script lang="ts">
export default {
  name: "BaseButton",
  props: {
    btnContent: String,
    color: String
  },
};
</script>

<style></style>
