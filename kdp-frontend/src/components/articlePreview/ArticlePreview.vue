<template>
  <div>
    <div class="article">
      <img src="@/assets/logo.svg" class="preview image" />
      <h4 class="title">{{ name }}</h4>
      <p class="content">
        {{ limitContent(content) }}
      </p>
      <p class="rockstar-name">
        {{ rockstarName }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import rockstar from "@/views/rockstars/store/rockstars";
export default {
  name: "ArticlePreview",
  props: {
    name: String,
    content: String,
    rockstarName: String,
  },
  setup() {
    const limitContent = (content: string): string => {
      return content.length < 250 ? content : content.substring(0, 250) + "...";
    };

    return { limitContent };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
@import "@/styles/ArticlePreview/ArticlePreview.scss";
</style>
