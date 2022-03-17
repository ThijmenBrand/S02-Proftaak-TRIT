<template>
  <div class="search-bar">
    <p>Message is: {{ message }}</p>
    <input v-model="searchQuery" placeholder="edit me" />
  </div>

  <div class="articles-container">
    <router-link
      to="/"
      v-for="(article, index) in articles"
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
      message: "",
    };
  },
  setup() {
    const store = useStore();

    const articles = computed((): ArticleShape[] => {
      const allArticles: ArticleShape[] = store.getters["getAllArticles"];
      return allArticles;
    });

    /* const searchQuery = ref("");
    const searchedArticles = computed(() => {
      return articles.value.filter((articles: ArticleShape) => {
        return (
          articles.articleTitle
            .toLowerCase()
            .indexOf(searchQuery.value.toLowerCase()) != -1
        );
      });
    });
    */

    return { articles };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
</style>
