<template>
  <RockstarView :rockstar="rockstar" />
  <div class="articles-container DIN2014-Regular">
    <div class="articles-content DIN2014-Regular">
      <ul>
        <li v-for="(article, index) in articles" :key="index">{{ article.title }}</li>
      </ul>
    </div>
  </div>  
  
</template>

<script lang="ts">
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { RockstarShape } from "@/models/Rockstar";
import { computed, onMounted, onUpdated } from "vue";
import rockstar from "@/views/rockstars/store/rockstars";
import RockstarView from "@/views/rockstars/RockstarView.vue";
import ArticleShape from "@/models/Article";

export default {
  components: { RockstarView },
  setup(props: any) {
    const route = useRoute();
    const store = useStore();
    
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
      rockstar, articles
    }
  },
  
};


</script>

<style scoped lang="scss">
@import "@/styles/variables.scss";

.articles-container {
  color: $trit-white;
  background-color: $trit-gray;
}


</style>
