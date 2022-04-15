<template>
  <Loader v-if="loading" />
  <div class="content-container" v-else>
    <div class="article-header-container">
      <div class="article-title-container">
        <h1>{{ articleDetails.title }}</h1>
      </div>
    </div>
  </div>
  <div class="background-container">
    <div class="actions-bar">
      <div class="blog-action">
        <span>Hart</span>
        <span>Comment</span>
      </div>
      <span>Bookmark</span>
    </div>
    <div class="content-container">
      <div class="article-content">
        <Blog class="article-text" :articleContent="articleDetails.content" />
        <p>{{ articleDetails.publishDate }}</p>
        <div class="border"></div>
        <!--   Todo: Comment section     -->
        <Comments />
      </div>
      <div class="side-bar">
        <RockstarView :rockstar="getRockstar" />
        <Recommended />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";

import ArticleShape from "@/models/Article";
import { RockstarShape } from "@/models/Rockstar";

import Comments from "./components/Comments.vue";
import Recommended from "./components/Recommended.vue";
import RockstarView from "./components/RockstarArticleView.vue";
import Blog from "./components/Blog.vue";
import Loader from "@/components/loader/Loader.vue";

export default {
  name: "Article-view",
  components: {
    Blog,
    Recommended,
    Comments,
    RockstarView,
    Loader,
  },
  setup() {
    const route = useRoute();
    const store = useStore();

    const loading = computed(() => store.getters["isLoading"]);

    const articleId = computed(() => {
      return route.params.articleId;
    });

    onMounted(async () => {
      await store.commit("article/CLEAR_ARTICLE");
      await store
        .dispatch("article/getArticle", articleId.value)
        .then(() => store.dispatch("article/getRockstar"));
      await store.dispatch("article/updateViewCount", articleId.value);
    });

    const articleDetails = computed((): ArticleShape => {
      const article = store.getters["article/getArticle"];
      return article;
    });

    const getRockstar = computed((): RockstarShape => {
      return store.getters["article/getRockstar"];
    });

    return {
      articleId,
      articleDetails,
      loading,
      getRockstar,
    };
  },
};
</script>

<style scoped lang="scss" src="@/styles/pageStyles/article/Article.scss" />
