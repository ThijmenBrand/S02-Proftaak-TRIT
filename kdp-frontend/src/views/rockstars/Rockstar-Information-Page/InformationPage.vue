<template>
  <RockstarView :rockstar="rockstar" />
  <div class="background-container">
    <div class="container content-container DIN2014-Regular">
      <div class="articles-container DIN2014-Regular">
        <Loader v-if="loading" />
        <router-link
            v-else
            v-for="(article, index) in articles"
            :key="index"
            :to="{
              name: 'article',
              params: { articleId: article.id },
            }"
            class="article">
          <article-preview :name="article.title" :content="article.content" />
        </router-link>
      </div>
    </div>  
  </div>
  
</template>

<script lang="ts">
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { RockstarShape } from "@/models/Rockstar";
import { computed, onMounted, onUpdated } from "vue";
import RockstarView from "@/views/rockstars/RockstarView.vue";
import ArticleShape from "@/models/Article";
import ArticlePreview from "@/components/articlePreview/ArticlePreview.vue";
import Loader from "@/components/loader/Loader.vue";

export default {
  components: { RockstarView, ArticlePreview, Loader },
  setup(props: any) {
    const route = useRoute();
    const store = useStore();
    
    const loading = computed(() => store.getters["isLoading"]);
    
    const rockstar = computed( (): RockstarShape => {
      return store.getters['rockstars/getRockstar'];
    });
    const articles = computed( (): ArticleShape[] => {
      return store.getters['rockstars/getArticles'];
    });

    // when loading the page, get the rockstar by id and their articles
    onMounted(() => {
      store.commit("rockstars/CLEAR_ROCKSTAR");
      store.dispatch('rockstars/getRockstar', route.params.rockstarId);
      store.dispatch('rockstars/getArticles', route.params.rockstarId);
    });
    
    // on every update, change the page title to the rockstar's name
    onUpdated( () => {
      document.title = rockstar.value.name;
      
      if (route.params.rockstarId !== rockstar.value.id){
        store.dispatch('rockstars/getRockstar', route.params.rockstarId);
        store.dispatch('rockstars/getArticles', route.params.rockstarId);
      }
    });
    
    return {
      rockstar, articles, loading
    }
  },  
};
</script>

<style scoped lang="scss">
@import "@/styles/variables.scss";

a {
  margin: 10px;
}

.articles-container {
  display: grid;
  justify-content: center;
  grid-row-gap: 1rem;
  grid-template-columns: auto auto auto;
}

.content-container {
  min-height: calc(100vh - 257.5px);
}
</style>
