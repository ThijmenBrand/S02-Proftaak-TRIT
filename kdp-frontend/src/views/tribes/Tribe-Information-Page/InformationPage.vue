<template>
  <div class="information-page-main">
    <div class="tribes-overview">
      <h3 class="tribe-title">{{ currentTribe.name }}</h3>
      <div class="profile-container">
        <profiletag
          v-for="(rockstar, index) in rockstars"
          :key="index"
          :name="rockstar.name"
          class="profile-tag"
        />
      </div>
    </div>

    <div class="content-container">
      <h3 class="articles-overview-title">Articles</h3>
      <div class="articles-container">
        <router-link
          :to="{ name: 'article', params: { articleId: article.articleId } }"
          v-for="(article, index) in articles"
          :key="index"
          class="article"
        >
          <article-preview
            :name="article.articleTitle"
            :content="article.articleContent"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ArticlePreview from "./Components/ArticlePreview.vue";
import Profiletag from "../../../components/Profiletag.vue";

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
  },
  setup(props: any) {
    const route = useRoute();
    const store = useStore();

    //todo, op basis van id een request sturen met individuele tribe info en daarvan de data gebruiken.
    const currentTribe = computed((): TribeShape => {
      return store.getters["tribes/getCurrentTribe"];
    });

    onMounted(() => {
      store.commit("tribes/SET_CURRENT_TRIBE", route.params.tribe);
      store.dispatch("tribes/getRockstarsByTribe", route.params.tribe);
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

    return { articles, rockstars, currentTribe };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
p {
  color: white;
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
  background: gray;
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
  color: white;
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
