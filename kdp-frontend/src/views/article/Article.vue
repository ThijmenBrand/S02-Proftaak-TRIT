<template>
  <Loader v-if="loading" />
  <div class="content-container" v-else>
    <div class="header-wrapper">
      <div class="title-category">
        <h1 class="page-title">{{ articleDetails.title }}</h1>
      </div>
      <ProfileTag
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
import ProfileTag from "@/components/profileTag/Profiletag.vue";
import ArticleShape from "@/models/Article";

import Blog from "./components/Blog.vue";
import Loader from "@/components/loader/Loader.vue";

import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import { RockstarShape } from "@/models/Rockstar";
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
      console.log(store.getters["article/getRockstar"]);
      return store.getters["article/getRockstar"];
    });

    return { articleId, articleDetails, loading, getRockstar };
  },
};
</script>

<style scoped lang="scss">
.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.article-content {
  padding: 30px 0px;
  min-height: calc(100vh - 365.5px);
}
.title-category {
  display: inline-block;
}
</style>
