<template>
  <RockstarView :rockstar="rockstar" />
  <div class="background-container">
    <div class="content-container DIN2014-Regular">
      <div class="loader-container" v-if="loading">
        <Loader />
      </div>
      <div class="articles-container" v-else>
        <router-link
          v-for="(article, index) in articles"
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
    </div>
  </div>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed, onMounted, onUpdated } from "vue";

import { RockstarShape } from "@/models/Rockstar";
import ArticleShape from "@/models/Article";

import RockstarView from "./components/RockstarView.vue";
import ArticlePreview from "@/components/articlePreview/ArticlePreview.vue";
import Loader from "@/components/loader/Loader.vue";

export default {
  components: { RockstarView, ArticlePreview, Loader },
  setup() {
    const route = useRoute();
    const store = useStore();

    const loading = computed(() => store.getters["isLoading"]);

    const rockstar = computed((): RockstarShape => {
      return store.getters["rockstars/getRockstar"];
    });
    const articles = computed((): ArticleShape[] => {
      return store.getters["rockstars/getArticles"];
    });

    // when loading the page, get the rockstar by id and their articles
    onMounted(() => {
      store.commit("rockstars/CLEAR_ROCKSTAR");
      store.dispatch("rockstars/getRockstar", route.params.rockstarId);
      store.dispatch("rockstars/getArticles", route.params.rockstarId);
    });

    // on every update, change the page title to the rockstar's name
    onUpdated(() => {
      document.title = rockstar.value.name;

      if (route.params.rockstarId !== rockstar.value.id) {
        store.dispatch("rockstars/getRockstar", route.params.rockstarId);
        store.dispatch("rockstars/getArticles", route.params.rockstarId);
      }
    });

    return {
      rockstar,
      articles,
      loading,
    };
  },
};
</script>

<style
  scoped
  lang="scss"
  src="@/styles/pageStyles/RockstarInformationPage/RockstarInformationPage.scss"
/>
