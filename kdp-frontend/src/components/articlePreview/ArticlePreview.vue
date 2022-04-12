<template>
  <div>
    <div>
      <img
        src="@/assets/images/article-placeholder-image.jpg"
        class="preview article-image"
        :alt="
          $t('explore-articles-page.article-thumbnail-alt-text', {
            articleName: this.name,
          })
        "
      />
      <div>
        <h4 class="article-preview-title">{{ name }}</h4>
        <p class="content">
          {{ limitContent(content) }}
        </p>
        <p class="rockstar-name">
          {{ rockstarName }}
        </p>
        <p class="publish-date">
          {{ articlePublishDate }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
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

    return { limitContent };
  },
};
</script>

<style lang="scss" scoped />
