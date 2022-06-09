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
        <img
          class="stats-image"
          src="@/assets/images/article/heart-solid.svg"
          :alt="$t('article-page.heart-image')"
        />
        <span class="stats">11</span>
        <img
          class="stats-image"
          src="@/assets/images/article/message-solid.svg"
          :alt="$t('article-page.comment-image')"
        />
        <span class="stats">{{ getComments.length }}</span>
      </div>
      <div class="views">
        <img
          class="stats-image"
          src="@/assets/images/article/eye-solid.svg"
          :alt="$t('article-page.view-image')"
        />
        <span class="stats">{{ articleDetails.viewCount }}</span>
        <img
          class="stats-image"
          src="@/assets/images/article/file-solid.svg"
          :alt="$t('article-page.page-view-image')"
        />
        <span class="stats">{{ articleDetails.totalViewCount }}</span>
      </div>
    </div>
    <div class="content-container">
      <div class="article-content">
        <Blog class="article-text" :articleContent="articleDetails.content" />
        <p>{{ articleDetails.publishDate }}</p>
        <div class="border"></div>
        <Comments :comments="getComments" />
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
import { CommentShape } from "@/models/Comment";

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
      store.commit("article/CLEAR_ARTICLE");
      await store
        .dispatch("article/getArticle", articleId.value)
        .then(() => store.dispatch("article/getRockstar"));
      await store.dispatch("article/getComments", articleId.value);
      await store.dispatch("article/updateViewCount", articleId.value);
      await store.dispatch("article/incrementLikeCount", articleId.value)
    });

    const articleDetails = computed((): ArticleShape => {
      const article = store.getters["article/getArticle"];
      return article;
    });

    const getRockstar = computed((): RockstarShape => {
      return store.getters["article/getRockstar"];
    });

    const getComments = computed(
      (): CommentShape => store.getters["article/getComments"]
    );

    return {
      articleId,
      articleDetails,
      loading,
      getRockstar,
      getComments,
    };
  },
};
</script>

<style scoped lang="scss" src="@/styles/pageStyles/article/Article.scss" />
