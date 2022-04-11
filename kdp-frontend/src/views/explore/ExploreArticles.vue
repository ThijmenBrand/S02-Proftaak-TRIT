<template>
  <div class="search-bar">
    <input v-model="searchQuery" placeholder="Search.." class="search-input" />
    <div class="custom-select">
      <select class="select" v-model="selectedFilter">
        <option class="select-item" value="">Select filter</option>
        <option class="select-item" value="new">Sort by newest</option>
        <option class="select-item" value="old">Sort by oldest</option>
        <option class="select-item" value="a-z">Sort title by A-Z</option>
        <option class="select-item" value="z-a">Sort title by Z-A</option>
      </select>
    </div>
  </div>
  <div class="background-container">
    <div class="content-container">
      <div v-if="loading">
        <Loader />
      </div>
      <div class="articles-container" v-else>
        <router-link
          v-for="(article, index) in filteredArticles"
          :key="index"
          :to="{
            name: 'article',
            params: { articleId: article.id },
          }"
          class="article"
        >
          <article-preview
            :name="article.title"
            :content="article.content"
            :rockstarName="article.rockstarName"
            :articlePublishDate="article.publishDate"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

import ArticleShape from "@/models/Article";

import ArticlePreview from "@/components/articlePreview/ArticlePreview.vue";
import Loader from "@/components/loader/Loader.vue";

export default {
  components: {
    ArticlePreview,
    Loader,
  },

  setup() {
    const store = useStore();

    const searchQuery = ref("");
    const selectedFilter = ref("");

    const loading = computed(() => store.getters["isLoading"]);

    onMounted(() => {
      store.dispatch("getAllArticles");
    });

    const articles = computed((): ArticleShape[] => {
      return store.getters["getAllArticles"];
    });

    const filteredArticles = computed((): ArticleShape[] => {
      let returnArray: ArticleShape[] = [];
      articles.value.forEach((article) => {
        if (article.rockstarName != null || article.tribeName != null) {
          if (
            article.title
              .toLowerCase()
              .indexOf(searchQuery.value.toLowerCase()) > -1 ||
            article.rockstarName
              .toLowerCase()
              .indexOf(searchQuery.value.toLowerCase()) > -1
          ) {
            returnArray.push(article);
          }
        }
      });
      if (selectedFilter.value == "a-z") {
        returnArray = returnArray.sort((a, b) => {
          let fa = a.title.toLowerCase(),
            fb = b.title.toLowerCase();
          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
      }
      if (selectedFilter.value == "z-a") {
        returnArray = returnArray.sort((a, b) => {
          let fa = a.title.toLowerCase(),
            fb = b.title.toLowerCase();
          if (fa < fb) {
            return 1;
          }
          if (fa > fb) {
            return -1;
          }
          return 0;
        });
      }
      if (selectedFilter.value == "new") {
        returnArray = returnArray.sort((a, b) => {
          return (
            new Date(a.publishDate.toString()).valueOf() -
            new Date(b.publishDate.toString()).valueOf()
          );
        });
      }
      if (selectedFilter.value == "old") {
        returnArray = returnArray.sort((a, b) => {
          return (
            new Date(b.publishDate.toString()).valueOf() -
            new Date(a.publishDate.toString()).valueOf()
          );
        });
      }
      return returnArray;
    });

    return { articles, filteredArticles, searchQuery, selectedFilter, loading };
  },
};
</script>

<style
  lang="scss"
  scoped
  src="@/styles/pageStyles/exploreArticles/ExploreArticles.scss"
/>
