<template>
  <div class="content-container" >
    <div class="article-header-container">
      <div class="article-title-container" v-if="!loading">
        <h1>{{ articleDetails.title }}</h1>
      </div>
    </div>
  </div>
  <div class="background-container" >
  <div class="loader-container" v-if="loading">
    <Loader />
  </div>
  <div v-else>
      <div class="actions-bar" >
        <div class="blog-action">
          <img
          class="stats-image"
          :class="{ liked: userLiked, 'not-logged-in': !LoggedIn }"
          id="like-button"
          src="@/assets/images/article/heart-solid.svg"
          :alt="$t('article-page.heart-image')"
          @click="updateLikeState"
        />
        <span class="stats">{{ articleDetails.likeCount }}</span>
          <img
            class="stats-image"
            src="@/assets/images/article/message-solid.svg"
            :alt="$t('article-page.comment-image')"
          />
          <span class="stats">{{ getComments.length }}</span>
        </div>
        <div class="views">
          <img
            class="stats-image"
            src="@/assets/images/article/eye-solid.svg"
            :alt="$t('article-page.view-image')"
          />
          <span class="stats">{{ articleDetails.viewCount }}</span>
          <img
            class="stats-image"
            src="@/assets/images/article/file-solid.svg"
            :alt="$t('article-page.page-view-image')"
          />
          <span class="stats">{{ articleDetails.totalViewCount }}</span>
        </div>
      </div>
      <div class="content-container">
        <div class="article-content">
          <div class="real-article-content">
            <Blog class="article-text" :articleContent="articleDetails.content" />
            <p>{{ articleDetails.publishDate }}</p>
          </div>
          <div class="border"></div>
          <Comments :comments="getComments" />
        </div>
        <div class="side-bar">
          <RockstarView :rockstar="getRockstar" />
          <Recommended />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed, onMounted, watch, ref } from "vue";

import ArticleShape from "@/models/Article";
import { RockstarShape } from "@/models/Rockstar";
import { CommentShape } from "@/models/Comment";

import Comments from "./components/Comments.vue";
import Recommended from "./components/Recommended.vue";
import RockstarView from "./components/RockstarArticleView.vue";
import Blog from "./components/Blog.vue";
import Loader from "@/components/loader/Loader.vue";
import { getAccountInfo, useIsAuthenticated } from "@/services/msal/msal";
import { AccountInfo } from "@azure/msal-browser";

export default {
  name: "Article-view",
  components: {
    Blog,
    Recommended,
    Comments,
    RockstarView,
    Loader,
  },
  methods:{
    toTop(){
      window.scrollTo(0,0);
    }
  },
  setup() {
    const route = useRoute();
    const store = useStore();

    const loading = ref(true);

    const LoggedIn: Ref<boolean> = useIsAuthenticated();
    const loggedUser: AccountInfo[] = getAccountInfo();

    const userLiked = computed(() => store.getters["article/getUserHasLiked"]);
    const articleId = computed(() => {
      return route.params.articleId;
    });
    
    const updateLikeState = async () => {
      if (LoggedIn.value) {
        store.dispatch("article/likeOrUnlike", {
          articleId: articleId.value,
          userId: loggedUser[0].homeAccountId,
          likeState: userLiked.value,
        });
      }
    };

    const init = async () => {
      toTop();
    }
    const toTop = async () =>{
      window.scrollTo(0,0);
    }
    watch(route, (newRoute) => {
      init();
    })
    
    onMounted(async () => {
      loading.value = true;
      init();
      store.commit("article/CLEAR_ARTICLE");
      if (LoggedIn.value) {
        store.dispatch("article/checkIfUserLiked", {
          articleId: articleId.value,
          userId: loggedUser[0].homeAccountId,
        });
      }
      await store
          .dispatch("article/getArticle", articleId.value)
          .then(() => store.dispatch("article/getRockstar"));
      await store.dispatch("article/getComments", articleId.value);
      await store.dispatch("article/updateViewCount", articleId.value);
      loading.value = false;
    });

    const articleDetails = computed((): ArticleShape => {
      const article = store.getters["article/getArticle"];
      document.title = article.title;
      return article;
    });

    let getLikes = computed((): number => {
      let likes = store.getters["article/getLikeCount"];
      return likes;
    });

    const getRockstar = computed((): RockstarShape => {
      return store.getters["article/getRockstar"];
    });

    const getComments = computed(
        (): CommentShape => store.getters["article/getComments"]
    );

    return {
      articleId,
      articleDetails,
      loading,
      getRockstar,
      getComments,
      updateLikeState,
      LoggedIn,
      getLikes,
      userLiked,
    };
  },
};
</script>

<style scoped lang="scss" src="@/styles/pageStyles/article/Article.scss" />