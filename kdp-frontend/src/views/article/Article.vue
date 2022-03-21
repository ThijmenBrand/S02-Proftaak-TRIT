<template>
  <div class="header-wrapper">
    <div class="title-category">
      <h1 class="page-title">{{ articleDetails.title }}</h1>
    </div>
    <ProfileTag :name="articleDetails.rockstarName"></ProfileTag>
  </div>
  <div class="content-container">
    <Blog :articleContent="articleDetails.content" />
  </div>
</template>

<script lang="ts">
import ProfileTag from "@/components/Profiletag.vue";
import ArticleShape from "@/models/Article";

import Blog from "./components/Blog.vue";

import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import { RockstarShape } from "@/models/Rockstar";
export default {
  name: "Article-view",
  components: {
    Blog,
    ProfileTag,
  },
  setup() {
    const route = useRoute();
    const store = useStore();

    const articleId = computed(() => {
      return route.params.articleId;
    });

    onMounted(() => {
      store.dispatch("article/getArticle", articleId.value);
    });

    const articleDetails = computed((): ArticleShape => {
      return store.getters["article/getArticle"];
    });

    return { articleId, articleDetails };
  },
};
</script>

<style scoped lang="scss">
.header-wrapper {
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content-container {
  padding: 30px;
}
.title-category {
  display: inline-block;
}
</style>
