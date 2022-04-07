
<template>
  <div>
    <div>
      <img
        src="@/assets/images/article-placeholder-image.jpg"
        class="preview article-image"
      />
      <div>
        <h4 class="article-preview-title">{{ name }}</h4>
        <p class="content">
          {{ limitContent(content) }}
        </p>
        <p class="rockstar-name">
          {{ rockstarName }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import ArticleShape from '@/models/Article';
import store from '@/store';
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
    
    const articleDetails = computed(
      (): ArticleShape => store.getters["article/getArticle"]
    );
    return { limitContent};
  },
};
</script>

<style lang="scss" scoped />
