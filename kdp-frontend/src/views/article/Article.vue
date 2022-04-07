<template>
  <Loader v-if="loading" />
  <div class="content-container" v-else>
    <div class="article-header-container">
      <div class="article-title-container">
        <h1>{{ articleDetails.title }}</h1>
      </div>
      <ProfileTag
        :id="getRockstar.id"
        :name="getRockstar.name"
        :image="getRockstar.image"
      ></ProfileTag>
    </div>
  </div>
  <div class="background-container">
    <div class="content-container article-content">
      <Blog :articleContent="articleDetails.content" />
    </div>
  </div>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";

import ArticleShape from "@/models/Article";
import { RockstarShape } from "@/models/Rockstar";

import Blog from "./components/Blog.vue";
import Loader from "@/components/loader/Loader.vue";
import ProfileTag from "@/components/profileTag/Profiletag.vue";

export default {
  name: "Article-view",
  components: {
    Blog,
    ProfileTag,
    Loader,
  },
  setup() {
    const route = useRoute();
    const store = useStore();

    const loading = computed(() => store.getters["isLoading"]);

    const articleId = computed(() => {
      return route.params.articleId;
    });

    onMounted(() => {
      store.commit("article/CLEAR_ARTICLE");
      store
        .dispatch("article/getArticle", articleId.value)
        .then(() => store.dispatch("article/getRockstar"));
    });

    const articleDetails = computed(
      (): ArticleShape => store.getters["article/getArticle"]
    );

    const getRockstar = computed((): RockstarShape => {
      return store.getters["article/getRockstar"];
    });

    return { articleId, articleDetails, loading, getRockstar };
  },
};
</script>

<style scoped lang="scss" src="@/styles/pageStyles/article/Article.scss" />
