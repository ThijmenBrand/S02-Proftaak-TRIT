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
        <h3 class="articles-overview-title" ref="articletop">
          {{ $t("articles-overview.header") }}
        </h3>
        <div class="loader-container" v-if="loading">
          <Loader />
        </div>

        <div class="articles-container" v-else>
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
        
          <a v-if="!loading && ShowLess" @click="toggleshow" class="viewmore">{{$t("articles-overview.viewmore")}}</a>
          <a v-if="!loading && !ShowLess" @click="toggleshow" class="viewmore">{{$t("articles-overview.viewless")}}</a>
        
          <h3 class="podcasts-overview-title">Podcasts</h3>
          <SpotifyCarousel v-if="cookie" :spotify-links="spotifyList" />
          <p class="cookie-error" v-else>Please enable cookies to view podcasts</p>
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
    
    const cookie = computed(() => store.getters["cookieAccepted"]);

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

      if(ShowLess.value) {
      return applyingArticles.slice(0, viewAmount);
      } else {
      return applyingArticles
      }
    });

    const rockstars = computed((): RockstarShape[] => {
      const rockstar = store.getters["tribes/getRockstarsByTribe"];
      return rockstar;
    });

    const tribeArticles = computed((): ArticleShape[] => {
      const articles = store.getters["tribes/getArticlesbByTribe"];

      if(ShowLess.value) {
      return articles.slice(0, viewAmount);
      } else {
      return articles
      }
    });

    let spotifyList = computed((): SpotifyShape[] => {
      const spotify: SpotifyShape[] =
        store.getters["tribes/getAllSpotifyByTribe"];
      return spotify;
    });
    
    let viewAmount = (Math.floor(window.innerWidth / 420)) * 2;
    if (window.innerWidth < 520) { viewAmount = 3 }

    let ShowLess = ref(true);

    function toggleshow() {
      ShowLess.value = !ShowLess.value;
    }

    return {
      tribeArticles,
      articles,
      rockstars,
      currentTribe,
      loading,
      spotifyList,
      viewAmount,
      toggleshow,
      ShowLess,
      cookie
    };
  },
};
</script>

<style lang="scss" scoped src="@/styles/pageStyles/tribePage/TribePage.scss" />
