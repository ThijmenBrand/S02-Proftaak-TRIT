<template>
  <div class="search-bar">
    <input v-model="searchQuery" placeholder="Search.." />
    <p>Searching for: {{ searchQuery }}</p>
    <p>{{ filteredArticles }}</p>
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
  data() {
    return {
      searchQuery: "",
    };
  },
  setup() {
    const store = useStore();

    const articles = computed((): ArticleShape[] => {
      const allArticles: ArticleShape[] = store.getters["getAllArticles"];
      return allArticles;
    });
    const searchQuery = ref("");

    const filteredArticles = computed((): ArticleShape[] => {
      const allArticles: ArticleShape[] = store.getters["getAllArticles"];
      return allArticles.filter((article: ArticleShape) => {
        return article.articleTitle
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase());
      });
    });

    return { articles, filteredArticles };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
</style>
