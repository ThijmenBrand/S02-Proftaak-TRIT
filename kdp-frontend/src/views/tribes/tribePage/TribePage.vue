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

        <div class="articles-container" v-if="ShowLess">
          <router-link
            :to="{ name: 'article', params: { articleId: article.id } }"
            v-for="(article, index) in tribeArticles.slice(0, 3)"
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
        
        <a @click="toggleshow()" class="viewmore">{{ShowLess}}</a>

        <h3 class="podcasts-overview-title">Podcasts</h3>
        <SpotifyCarousel :spotify-links="spotifyList" />
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

import { defineComponent } from "vue";



export default defineComponent({
  data () {
    return {
      ShowLess:true,
      windowheigt:0
    }
  },
  methods: {
    async toggleshow() {
      this.windowheigt = window.scrollY;

      console.log(window.scrollY);

      this.ShowLess = !this.ShowLess;
      await this.sleep(1);
      window.scrollTo(0, this.windowheigt);
    },
    async sleep(ms: number) {
      return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}


  },

  components: {
    SpotifyCarousel,
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

    return {
      tribeArticles,
      articles,
      rockstars,
      currentTribe,
      loading,
      spotifyList,
    };
  },
});
</script>

<style lang="scss" scoped src="@/styles/pageStyles/tribePage/TribePage.scss" />
