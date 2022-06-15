<template>
  <div v-html="articleContent" class="ck-content" />
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

<style lang="scss">
img {
  width: 100%;
}

pre {
  overflow-x: auto;
  white-space: pre !important;
}

.ck-content figure.table {
  pre {
    overflow-x: hidden;
  }

  display: block !important;
  overflow-x: auto;
}
</style>
