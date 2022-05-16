<template>
  <RockstarView :rockstar="rockstar" />
  <div class="background-container">
    <div class="content-container DIN2014-Regular">
      <h3 class="articles-overview-title">
        {{ $t("articles-overview.header") }}
      </h3>
      <div class="loader-container" v-if="loading">
        <Loader />
      </div>
      <div
        class="articles-container"
        v-else-if="!loading && articles.length > 0"
      >
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
      <p class="article-error" v-else>{{ $t("article.article-error") }}</p>
    </div>

    <div :style="[loading || pageCount <= 1 ? { display: 'none' } : {}]">
      <page-select :PageCount="pageCount" @current-page="SetCurrentPage" />
    </div>
  </div>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed, onMounted, onUpdated, ref } from "vue";

import { RockstarShape } from "@/models/Rockstar";
import ArticleShape from "@/models/Article";

import RockstarView from "@/components/rockstarView/RockstarView.vue";
import ArticlePreview from "@/components/articlePreview/ArticlePreview.vue";
import Loader from "@/components/loader/Loader.vue";
import PageSelect from "@/components/PageSelect/PageSelect.vue";

export default {
  components: { RockstarView, ArticlePreview, Loader, PageSelect },
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
    onMounted(async () => {
      const rockstarArticleParams = {
        tribeId: route.params.rockstarId,
        ArticlesPerPage: articlesPerPage.value,
      };
      await store.commit("rockstars/CLEAR_ROCKSTAR");
      await store.dispatch("rockstars/getRockstar", route.params.rockstarId);
      await store.dispatch(
        "rockstars/getArticleCount",
        route.params.rockstarId
      );
      await store.dispatch("rockstars/getArticles", rockstarArticleParams);
    });

    //pagination
    const articlesPerPage = ref(6);
    const CurrentPage = ref(0);

    const SetCurrentPage = (_page: number): void => {
      const rockstarArticleParams = {
        tribeId: route.params.rockstarId,
        ArticlesPerPage: articlesPerPage.value,
      };

      store.dispatch("rockstars/getArticles", rockstarArticleParams);
      CurrentPage.value = _page;
    };

    const pageCount = computed((): number => {
      const articlecount = store.getters["rockstars/getArticleCount"];
      return Math.ceil(articlecount / articlesPerPage.value);
    });

    // on every update, change the page title to the rockstar's name
    onUpdated(async () => {
      document.title = rockstar.value.name;

      if (route.params.rockstarId !== rockstar.value.id) {
        const rockstarArticleParams = {
          tribeId: route.params.rockstarId,
          ArticlesPerPage: articlesPerPage.value,
        };

        await store.dispatch("rockstars/getRockstar", route.params.rockstarId);
        await store.dispatch("rockstars/getArticles", rockstarArticleParams);
      }
    });

    return {
      rockstar,
      articles,
      loading,
      SetCurrentPage,
      pageCount,
    };
  },
};
</script>

<style
  scoped
  lang="scss"
  src="@/styles/pageStyles/RockstarInformationPage/RockstarInformationPage.scss"
/>
