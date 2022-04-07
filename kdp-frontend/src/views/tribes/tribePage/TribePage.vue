<template>
  <div class="information-page-main">
    <div class="tribes-overview">
      <h3 class="tribe-title">{{ currentTribe.name }}</h3>
      <div class="profile-container">
          <profiletag  v-for="(rockstar, index) in rockstars"
            :key="index" 
            :id="rockstar.id"
            :name="rockstar.name"
            :image="rockstar.image"
            :role="rockstar.role"
            class="profile-tag"
          />
      </div>
    </div>
    <div class="background-container">
      <div class="content-container">
        <h3 class="articles-overview-title">Articles</h3>
        <div class="loader-container" v-if="loading">
          <Loader />
        </div>
        <div class="articles-container">
          <router-link
            :to="{ name: 'article', params: { articleId: article.id } }"
            v-for="(article, index) in tribeArticles"
            :key="index"
            class="article"
          >
            <article-preview
              :name="article.title"
              :content="article.content"
              :rockstarName="article.rockstarName"
            />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

import { RockstarShape } from "@/models/Rockstar";
import { TribeShape } from "@/models/Tribe";
import ArticleShape from "@/models/Article";

import ArticlePreview from "@/components/articlePreview/ArticlePreview.vue";
import Profiletag from "@/components/profileTag/Profiletag.vue";
import Loader from "@/components/loader/Loader.vue";
export default {
  components: {
    Profiletag,
    ArticlePreview,
    Loader,
  },
  setup() {
    const route = useRoute();
    const store = useStore();

    const loading = computed(() => store.getters["isLoading"]);

    //todo, op basis van id een request sturen met individuele tribe info en daarvan de data gebruiken.
    const currentTribe = computed((): TribeShape => {
      return store.getters["tribes/getCurrentTribe"];
    });

    onMounted(() => {
      store.commit("tribes/EMPTY_STORE");
      store.dispatch("tribes/getCurrentTribe", route.params.tribe);
      store.dispatch("tribes/getRockstarsByTribe", route.params.tribe);
      store.dispatch("tribes/getArticlesByTribe", route.params.tribe);
    });

    const articles = computed((): ArticleShape[] => {
      const applyingArticles: ArticleShape[] = [];

      const allArticles: ArticleShape[] =
        store.getters["tribes/getAllArticles"];

      allArticles.forEach((article) => {
        article.tribeId === currentTribe.value.id
          ? applyingArticles.push(article)
          : "";
      });

      return applyingArticles;
    });

    const rockstars = computed((): RockstarShape[] => {
      const rockstar = store.getters["tribes/getRockstarsByTribe"];
      return rockstar;
    });

    const tribeArticles = computed((): ArticleShape[] => {
      const articles = store.getters["tribes/getArticlesbByTribe"];
      return articles;
    });

    return { tribeArticles, articles, rockstars, currentTribe, loading };
  },
};
</script>

<style lang="scss" scoped src="@/styles/pageStyles/tribePage/TribePage.scss" />
