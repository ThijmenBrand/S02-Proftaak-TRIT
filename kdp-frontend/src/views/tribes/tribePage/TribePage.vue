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
    <div class="search-bar">
      <input
        v-model="searchQuery"
        :placeholder="$t('explore-articles-page.search-bar.placeholder')"
        class="search-input"
      />
      <div class="custom-select">
        <select class="select" v-model="selectedFilter">
         <option class="select-item" value="">
           {{ $t("explore-articles-page.search-bar.select-filter") }}
         </option>
         <option class="select-item" value="new">
           {{ $t("explore-articles-page.search-bar.sort-newest") }}
         </option>
        <option class="select-item" value="old">
          {{ $t("explore-articles-page.search-bar.sort-oldest") }}
        </option>
        <option class="select-item" value="a-z">
           {{ $t("explore-articles-page.search-bar.sort-title-az") }}
        </option>
        <option class="select-item" value="z-a">
          {{ $t("explore-articles-page.search-bar.sort-title-za") }}
        </option>
       </select>
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
        <div class="articles-container" v-else>
          <router-link
            v-for="(article, index) in filteredArticles"
            :key="index"
            :to="{
              name: 'article',
              params: { articleId: article.id },
            }"
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
        <h3 class="podcasts-overview-title">Podcasts</h3>
        <SpotifyCarousel :spotify-links="spotifyList" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, ref } from "vue";
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

    const searchQuery = ref("");
    const selectedFilter = ref("");

    const loading = computed(() => store.getters["isLoading"]);

    //todo, op basis van id een request sturen met individuele tribe info en daarvan de data gebruiken.
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

    let spotifyList = computed((): SpotifyShape[] => {
      const spotify: SpotifyShape[] =
        store.getters["tribes/getAllSpotifyByTribe"];
      return spotify;
    });

    const filteredArticles = computed((): ArticleShape[] => {
      let returnArray: ArticleShape[] = [];
      articles.value.forEach((article) => {
        if (article.rockstarName != null || article.tribeName != null) {
          if (
            article.title
              .toLowerCase()
              .indexOf(searchQuery.value.toLowerCase()) > -1 ||
            article.rockstarName
              .toLowerCase()
              .indexOf(searchQuery.value.toLowerCase()) > -1
          ) {
            returnArray.push(article);
          }
        }
      });
      if (selectedFilter.value == "a-z") {
        returnArray = returnArray.sort(
          (firstComparisonObject, seccondComparisonObject) => {
            let firstObejctToLower = firstComparisonObject.title.toLowerCase(),
              secondObjectToLower = seccondComparisonObject.title.toLowerCase();
            if (firstObejctToLower < secondObjectToLower) {
              return -1;
            }
            if (firstObejctToLower > secondObjectToLower) {
              return 1;
            }
            return 0;
          }
        );
      }
      if (selectedFilter.value == "z-a") {
        returnArray = returnArray.sort(
          (firstComparisonObject, seccondComparisonObject) => {
            let firstObjectToLower = firstComparisonObject.title.toLowerCase(),
              secondObjectToLower = seccondComparisonObject.title.toLowerCase();
            if (firstObjectToLower < secondObjectToLower) {
              return 1;
            }
            if (firstObjectToLower > secondObjectToLower) {
              return -1;
            }
            return 0;
          }
        );
      }
      if (selectedFilter.value == "new") {
        returnArray = returnArray.sort(
          (firstComparisonObject, seccondComparisonObject) => {
            return (
              new Date(firstComparisonObject.publishDate.toString()).valueOf() -
              new Date(seccondComparisonObject.publishDate.toString()).valueOf()
            );
          }
        );
      }
      if (selectedFilter.value == "old") {
        returnArray = returnArray.sort(
          (firstComparisonObject, seccondComparisonObject) => {
            return (
              new Date(firstComparisonObject.publishDate.toString()).valueOf() -
              new Date(seccondComparisonObject.publishDate.toString()).valueOf()
            );
          }
        );
      }
      return returnArray;
    });
    
    return {
      tribeArticles,
      filteredArticles, 
      searchQuery, 
      selectedFilter,
      articles,
      rockstars,
      currentTribe,
      loading,
      spotifyList,
    };
  },
};
</script>

<style lang="scss" scoped src="@/styles/pageStyles/tribePage/TribePage.scss" />
