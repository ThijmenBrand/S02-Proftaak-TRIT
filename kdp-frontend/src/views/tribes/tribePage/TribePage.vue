<template>
  <div class="information-page-main">
    <div class="tribes-overview">
      <h3 class="tribe-title">{{ currentTribe.name }}</h3>
      <div class="profile-container">
        <profiletag
          v-for="(rockstar, index) in rockstars"
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
            :to="{ name: 'article', params: { articleId: article.id } }"
            v-for="(article, index) in tribeArticles"
            :key="index"
            class="article"
          >
            <article-preview
              :name="article.title"
              :content="article.content"
              :rockstarName="article.rockstarName"
              :articlePublishDate="article.publishDate"
            />
          </router-link>
        </div>
        <p class="cookie-error" v-else>{{ $t("article.article-error") }}</p>
        <h3 class="podcasts-overview-title">Podcasts</h3>
        <SpotifyCarousel
          v-if="AcceptedFunctionalCookies && spotifyList.length > 0"
          :spotify-links="spotifyList"
        />
        <p
          class="cookie-error"
          v-else-if="!AcceptedFunctionalCookies && spotifyList.length > 0"
        >
          {{ $t("tribe-page.cookie-error") }}
        </p>
        <p class="cookie-error" v-else>{{ $t("tribe-page.spotify-error") }}</p>
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
import SpotifyShape from "@/models/Spotifiy";

import ArticlePreview from "@/components/articlePreview/ArticlePreview.vue";
import Profiletag from "@/components/profileTag/Profiletag.vue";
import Loader from "@/components/loader/Loader.vue";
import SpotifyCarousel from "@/components/carousel/Carousel.vue";
import CookieShape from "@/models/Cookie";

export default {
  components: {
    SpotifyCarousel,
    Profiletag,
    ArticlePreview,
    Loader,
  },
  setup() {
    const route = useRoute();
    const store = useStore();

    const cookie = computed((): CookieShape => store.getters["cookieAccepted"]);
    const AcceptedFunctionalCookies =
      cookie.value.AcceptedAllCookies || cookie.value.AcceptedFunctionalCookies;
    const loading = computed(() => store.getters["isLoading"]);

    const currentTribe = computed((): TribeShape => {
      return store.getters["tribes/getCurrentTribe"];
    });

    onMounted(async () => {
      await store.commit("tribes/EMPTY_STORE");
      await store.dispatch("tribes/getCurrentTribe", route.params.tribe);
      await store.dispatch("tribes/getRockstarsByTribe", route.params.tribe);
      await store.dispatch("tribes/getArticlesByTribe", route.params.tribe);
      await store.dispatch("tribes/getAllSpotifyByTribe", route.params.tribe);
    });

    const articles = computed((): ArticleShape[] => {
      const applyingArticles: ArticleShape[] = [];

      const allArticles: ArticleShape[] =
        store.getters["tribes/getAllArticles"];

      if (allArticles.length > 0) {
        allArticles.forEach((article) => {
          article.tribeId === currentTribe.value.id
            ? applyingArticles.push(article)
            : "";
        });
      }

      return applyingArticles;
    });

    const rockstars = computed(
      (): RockstarShape[] => store.getters["tribes/getRockstarsByTribe"]
    );

    const tribeArticles = computed(
      (): ArticleShape[] => store.getters["tribes/getArticlesbByTribe"]
    );

    let spotifyList = computed(
      (): SpotifyShape[] => store.getters["tribes/getAllSpotifyByTribe"]
    );

    return {
      tribeArticles,
      articles,
      rockstars,
      currentTribe,
      loading,
      spotifyList,
      AcceptedFunctionalCookies,
    };
  },
};
</script>

<style lang="scss" scoped src="@/styles/pageStyles/tribePage/TribePage.scss" />
