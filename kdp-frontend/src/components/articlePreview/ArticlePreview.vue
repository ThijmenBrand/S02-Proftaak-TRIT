<template>
  <div class="article-container">
    <div class="image-container">
      <img
        src="@/assets/images/article-placeholder-image.jpg"
        class="preview article-image"
        :alt="
          $t('explore-articles-page.article-thumbnail-alt-text', {
            articleName: this.name,
          })
        "
      />
      <div class="article-content-container">
        <h4 class="article-preview-title">{{ name }}</h4>
        <p class="content">
          {{ limitContent(cleanText(content)) }}
        </p>
        <p class="rockstar-name">
          {{ rockstarName }}
        </p>
        <p class="publish-date">
          {{ getCustomDateTime(articlePublishDate) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import getCustomDateTime from "@/services/customDateTime";
export default {
  name: "ArticlePreview",
  props: {
    name: String,
    content: String,
    rockstarName: String,
    articlePublishDate: String,
  },
  setup() {
    const limitContent = (content: string): string => {
      return content.length < 250 ? content : content.substring(0, 250) + "...";
    };

    const cleanText = (content: string): string => {
      return content.replace(/<\/?[^>]+(>|$)/g, "");
    };

    return { limitContent, cleanText, getCustomDateTime };
  },
};
</script>

<style lang="scss" scoped />
