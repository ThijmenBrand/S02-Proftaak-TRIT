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
  <div class="background-container row">
    <div class="content-container">
      <div class="article-info">
        <div class="left-article-info">
          <span class="info-item"
            ><View class="icon" /> {{ mockData.views }}</span
          >
          <span class="info-item"
            ><Star v-if="!mockData.liked" class="icon" /><StarFilled
              v-else
              class="icon"
            />
            {{ mockData.likes }}</span
          >
          <span class="info-item"
            ><ChatLineSquare class="icon" /> {{ mockData.comments }}</span
          >
        </div>
        <div class="right-article-info">
          <span class="info-item">
            <CirclePlus v-if="!mockData.saved" class="icon" /><CirclePlusFilled
              v-else
              class="icon"
            />
          </span>
        </div>
      </div>
      <div class="article-content column left">
        <Blog :articleContent="articleDetails.content" />
      </div>
      <div class="column right"></div>
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
import {
  Star,
  View,
  StarFilled,
  ChatLineSquare,
  CirclePlusFilled,
  CirclePlus,
} from "@element-plus/icons-vue";

export default {
  name: "Article-view",
  components: {
    Blog,
    ProfileTag,
    Loader,
    View,
    Star,
    StarFilled,
    ChatLineSquare,
    CirclePlusFilled,
    CirclePlus,
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

    const mockData = {
      views: 10,
      likes: 4,
      liked: false,
      comments: 1,
      saved: false,
    };

    const getRockstar = computed((): RockstarShape => {
      return store.getters["article/getRockstar"];
    });

    return { articleId, articleDetails, loading, getRockstar, mockData };
  },
};
</script>

<style scoped lang="scss" src="@/styles/pageStyles/article/Article.scss" />
