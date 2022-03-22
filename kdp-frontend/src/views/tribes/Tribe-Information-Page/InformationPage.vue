<template>
  <div class="loader-container" v-if="loading">
    <Loader />
  </div>
  <div class="information-page-main" v-else>
    <div class="tribes-overview">
      <h3 class="tribe-title">{{ currentTribe.name }}</h3>
      <div class="profile-container">
        <div class="lds-ripple" v-if="loading">
          <div></div>
          <div></div>
        </div>
        <profiletag
          v-else
          v-for="(rockstar, index) in rockstars"
          :key="index"
          :name="rockstar.name"
          class="profile-tag"
        />
      </div>
    </div>
<div class="background-container">
    <div class="content-container">
      <h3 class="articles-overview-title">Articles</h3>
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
          />
        </router-link>
      </div>
    </div>
  </div>
  </div>
</template>

<script lang="ts">
import ArticlePreview from "./Components/ArticlePreview.vue";
import Profiletag from "@/components/profileTag/Profiletag.vue";
import Loader from "@/components/loader/Loader.vue";

import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import { RockstarShape } from "@/models/Rockstar";
import { TribeShape } from "@/models/Tribe";
import ArticleShape from "@/models/Article";
export default {
  components: {
    Profiletag,
    ArticlePreview,
    Loader,
  },
  setup(props: any) {
    const route = useRoute();
    const store = useStore();

    const loading = computed(() => store.getters["isLoading"]);

    //todo, op basis van id een request sturen met individuele tribe info en daarvan de data gebruiken.
    const currentTribe = computed((): TribeShape => {
      return store.getters["tribes/getCurrentTribe"];
    });

    onMounted(() => {
      store.dispatch("tribes/getCurrentTribe", route.params.tribe);
      store.dispatch("tribes/getRockstarsByTribe", route.params.tribe);
      store.dispatch("tribes/getArticlesByTribe",route.params.tribe);
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

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.loader-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
p {
  color: $trit-white;
  margin: 0;
}
/* width */
::-webkit-scrollbar {
  width: 5px;
  height: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: $trit-gray;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.tribes-overview {
  background-color: $trit-yellow;
  width: auto;
  height: 300px;
  margin: 0%;
  padding: 0%;
}
.content-container {
  min-height: 452px;
}
.tribe-title {
  margin: 0;
  padding: 20px;
  padding-left: 40px;
}
.profile-container {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  overflow-x: auto;
}
.articles-overview-title {
  text-align: center;
  margin: 0;
  color: $trit-white;
  padding-top: 20px;
}
.articles-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 40px;
}
.article {
  margin: 30px;
  text-decoration: none;
}
.profile-tag {
  margin: 20px;
}
</style>
