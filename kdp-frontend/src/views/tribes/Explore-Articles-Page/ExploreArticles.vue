<template>
  <div class="search-bar">
    <input v-model="searchQuery" placeholder="Search.." />
  </div>

  <div class="articles-container">
    <router-link
      to="/"
      v-for="(article, index) in filteredArticles"
      :key="index"
      class="article"
    >
      <article-preview
        :name="article.articleTitle"
        :content="article.articleContent"
      />
    </router-link>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import ArticleShape, { articleCategory } from "@/models/Article";
import { computed, ref } from "vue";
import ArticlePreview from "@/components/ArticlePreview.vue";

export default {
  components: {
    ArticlePreview,
  },

  setup() {
    const store = useStore();
    const searchQuery = ref("");

    const articles = computed((): ArticleShape[] => {
      const allArticles: ArticleShape[] = store.getters["getAllArticles"];
      return allArticles;
    });

    const filteredArticles = computed((): ArticleShape[] => {
      const allArticles: ArticleShape[] = store.getters["getAllArticles"];
      return allArticles.filter((article: ArticleShape) => {
        return (
          article.articleTitle
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase()),
          article.articleWriter
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase())
        );
      });
    });

    return { articles, filteredArticles, searchQuery };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
</style>
