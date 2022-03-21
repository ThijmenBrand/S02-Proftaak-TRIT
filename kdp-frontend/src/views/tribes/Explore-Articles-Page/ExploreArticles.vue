<template>
  <div class="search-bar">
    <input v-model="searchQuery" placeholder="Search.." />
  </div>

  <div class="articles-container">
    <router-link
      v-for="(article, index) in filteredArticles"
      :key="index"
      :to="{
        name: 'article',
        params: { articleId: article.id },
      }"
      class="article"
    >
      <article-preview :name="article.title" :content="article.content" />
    </router-link>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, ref } from "vue";
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

    onMounted(() => {
      store.dispatch("getAllArticles");
    });

    const articles = computed((): ArticleShape[] => {
      return store.getters["getAllArticles"];
    });

    const filteredArticles = computed((): ArticleShape[] => {
      const returnArray: ArticleShape[] = [];
      articles.value.forEach((article) => {
        if (
          article.title.toLowerCase().indexOf(searchQuery.value.toLowerCase()) >
            -1 ||
          article.rockstarName
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
