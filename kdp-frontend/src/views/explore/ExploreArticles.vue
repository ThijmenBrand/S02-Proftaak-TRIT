<template>
  <div class="search-bar">
    <input
      v-model="searchQuery"
      :placeholder="$t('explore-articles-page.search-bar.placeholder')"
      class="search-input"
    />
    <div class="custom-select">
      <select class="select" v-model="selectedFilter">
        <option class="select-item" value="">
          {{ $t("explore-articles-page.search-bar.select-filter") }}
        </option>
        <option class="select-item" value="new">
          {{ $t("explore-articles-page.search-bar.sort-newest") }}
        </option>
        <option class="select-item" value="old">
          {{ $t("explore-articles-page.search-bar.sort-oldest") }}
        </option>
        <option class="select-item" value="a-z">
          {{ $t("explore-articles-page.search-bar.sort-title-az") }}
        </option>
        <option class="select-item" value="z-a">
          {{ $t("explore-articles-page.search-bar.sort-title-za") }}
        </option>
      </select>
    </div>
  </div>
  <div class="background-container">
    <div class="content-container">
      <div v-if="loading">
        <Loader />
      </div>
      <div class="articles-container" v-else-if="!loading && articles.length > 0">
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
      <p class="article-error" v-else>{{ $t("article.article-error") }}</p>
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

    onMounted(async () => {
      await store.dispatch("getAllArticles");
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
        returnArray = returnArray.sort(
          (firstComparisonObject, seccondComparisonObject) => {
            let firstObejctToLower = firstComparisonObject.title.toLowerCase(),
              secondObjectToLower = seccondComparisonObject.title.toLowerCase();
            if (firstObejctToLower < secondObjectToLower) {
              return -1;
            }
            if (firstObejctToLower > secondObjectToLower) {
              return 1;
            }
            return 0;
          }
        );
      }
      if (selectedFilter.value == "z-a") {
        returnArray = returnArray.sort(
          (firstComparisonObject, seccondComparisonObject) => {
            let firstObjectToLower = firstComparisonObject.title.toLowerCase(),
              secondObjectToLower = seccondComparisonObject.title.toLowerCase();
            if (firstObjectToLower < secondObjectToLower) {
              return 1;
            }
            if (firstObjectToLower > secondObjectToLower) {
              return -1;
            }
            return 0;
          }
        );
      }
      if (selectedFilter.value == "new") {
        returnArray = returnArray.sort(
          (firstComparisonObject, seccondComparisonObject) => {
            return (
              new Date(firstComparisonObject.publishDate.toString()).valueOf() -
              new Date(seccondComparisonObject.publishDate.toString()).valueOf()
            );
          }
        );
      }
      if (selectedFilter.value == "old") {
        returnArray = returnArray.sort(
          (firstComparisonObject, seccondComparisonObject) => {
            return (
              new Date(firstComparisonObject.publishDate.toString()).valueOf() -
              new Date(seccondComparisonObject.publishDate.toString()).valueOf()
            );
          }
        );
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
