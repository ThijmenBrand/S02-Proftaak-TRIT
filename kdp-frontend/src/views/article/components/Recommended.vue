<template>
  <div class="recommended">
    <h3 class="recommended-title">
      {{ $t("article-page.recommended-title") }}
    </h3>
    <div class="articles-container" v-if="articles.length > 0">
        <div
          v-for="(article, index) in articles"
          :key="index"
          @click="sendToArticle(article.id)"
        >
          <recommended-article-preview
            :name="article.title"
            :content="article.content"
            :rockstarName="article.rockstarName"
            :articlePublishDate="article.publishDate"
            :thumbnail="article.thumbnail"
          />
        </div>
    </div> 
  </div>
</template>

<script lang="ts">
import RecommendedArticlePreview from "@/components/articlePreview/RecommendedArticlePreview.vue"
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import ArticleShape from "@/models/Article";
import router from '@/router';

export default {
  name: "Recommended",
  components: {
    RecommendedArticlePreview,
  },
    setup() {
    const store = useStore();

    onMounted(async () => {
      await store.dispatch("getAllArticles", 3);
    });
    const sendToArticle = (id: string) => {
      router.push(`/article/${id}`)
    }
    
    const articles = computed((): ArticleShape[] => {
      return store.getters["getAllArticles"];
    });

    return { store, articles, sendToArticle }
  },
};
</script>

<style
  scoped
  lang="scss"
  src="@/styles/pageStyles/article/RecommendedView.scss"
/>
