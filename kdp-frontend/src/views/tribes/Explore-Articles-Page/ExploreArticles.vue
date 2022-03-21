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
      <article-preview :name="article.title" :content="article.content" />
    </router-link>
  </div>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";

import ArticleShape from "@/models/Article";
import ArticlePreview from "@/components/ArticlePreview.vue";

export default {
  components: {
    ArticlePreview,
  },

  setup() {
    const store = useStore();

    const searchQuery = ref("");

    const articles = computed((): ArticleShape[] => {
      return store.getters["getAllArticles"];
    });

    const filteredArticles = computed((): ArticleShape[] => {
      const returnArray: ArticleShape[] = [];
      articles.value.forEach((article) => {
        if (
          article.title.toLowerCase().indexOf(searchQuery.value.toLowerCase()) >
            -1 ||
          article.writer
            .toLowerCase()
            .indexOf(searchQuery.value.toLowerCase()) > -1
        ) {
          returnArray.push(article);
        }
      });

      return returnArray;
    });

    return { articles, filteredArticles, searchQuery };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
</style>
