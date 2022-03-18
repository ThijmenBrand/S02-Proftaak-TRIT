<template>
  <RockstarView :rockstar="rockstar" />
  <div class="articles-container DIN2014-Regular">
    <ul>
      <li v-for="(article, index) in articles" :key="index">{{ article.title }}</li>
    </ul>
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
      store.dispatch('rockstars/getRockstar', route.params.rockstarId);
    });
    onMounted(() => {
      store.dispatch('rockstars/getArticles', route.params.rockstarId);
    });
    
    // on every update, change the page title to the rockstar's name
    onUpdated( () => {
      document.title = rockstar.value.name;
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
  background-color: $trit-black;
  color: $trit-white;
  min-height: 100vh;
}

</style>
