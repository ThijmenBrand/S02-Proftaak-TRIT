<template>
  <Loader v-if="loading"/>
  <div class="content-container" v-else>
    <div class="article-header-container">
      <div class="article-title-container">
        <h1>{{ articleDetails.title }}</h1>
      </div>

    </div>
  </div>
  <div class="background-container">
<!--              <p>{{ articleDetails.publishDate }}</p>-->
    <div class="actions-bar">
      <div class="blog-action">
        <span>Hart</span>
        <span>Comment</span>
      </div>
      <span>Bookmark</span>
    </div>
    <div class="content-container">
      <div class="article-content">
        <Blog class="article-text" :articleContent="articleDetails.content"/>
        <div class="border"></div>
      </div>

      
      <div class="side-bar">
        <div class="rockstar">
          <img class="rockstar-image" :src="getRockstar.image">
          <div class="rockstar-info">
            <p>{{getRockstar.name}}</p>
            <div class="socials">
              <a  v-if="getRockstar.twitter != null" class="social-component" :href="getRockstar.twitter">
                <img class="social-image" src="@/assets/images/socials/twitter.svg" alt="Twitter"/>
              </a>
              <a v-if="getRockstar.linkedIn != null" class="social-component" :href="getRockstar.linkedIn">
                <img class="social-image" src="@/assets/images/socials/linkedin.svg" alt="LinkedIn"/>
              </a>
              <a v-if="getRockstar.email != null" class="social-component" :href="'mailto:' + getRockstar.email">
                <img class="social-image" src="@/assets/images/socials/email.svg" :alt="getRockstar.email"/>
              </a>
              <a v-if="getRockstar.phone != null" class="social-component" :href="'tel:' + getRockstar.phone">
                <img class="social-image" src="@/assets/images/socials/phone.svg" :alt="getRockstar.phone"/>
              </a>
            </div>
          </div>
        </div>
        <div class="recommended">
          <h2 class="recommended-title">Ook interessant</h2>
          <div class="recommended-article">
            <img class="recommended-image" :src="getRockstar.image">
            <h3 class="recommended-article-title">Dont use console.log anymore</h3>
          </div>
          <div class="recommended-article">
            <img class="recommended-image" :src="getRockstar.image">
            <h3 class="recommended-article-title">aukje is stiekem wel lekker</h3>
          </div>
          <div class="recommended-article">
            <img class="recommended-image" :src="getRockstar.image">
            <h3 class="recommended-article-title">Dont use console.log anymore</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {computed, onMounted} from "vue";

import ArticleShape from "@/models/Article";
import {RockstarShape} from "@/models/Rockstar";

import Blog from "./components/Blog.vue";
import Loader from "@/components/loader/Loader.vue";

export default {
  name: "Article-view",
  components: {
    Blog,
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

<style scoped lang="scss" src="@/styles/pageStyles/article/Article.scss"/>
