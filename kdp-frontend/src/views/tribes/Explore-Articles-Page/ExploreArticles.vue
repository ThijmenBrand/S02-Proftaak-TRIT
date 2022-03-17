<template>
  <div class="search-bar">
    <p>Message is: {{ message }}</p>
    <input v-model="message" placeholder="edit me" />
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
import ArticleShape from "@/models/Article";
import { computed } from "vue";
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

    return { articles };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
</style>
