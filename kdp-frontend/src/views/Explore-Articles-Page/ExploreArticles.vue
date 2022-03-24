<template>
  <div class="search-bar">
    <input v-model="searchQuery" placeholder="Search.." class="search-input" />
    <select v-model="selectedFilter">
      <option value="">Select filter</option>
      <option value="new">Sort by newest</option>
      <option value="old">Sort by oldest</option>
      <option value="az">Sort title by A-Z</option>
      <option value="za">Sort title by Z-A</option>
    </select>
  </div>
  <div class="background-container">
    <div class="container content-container">
      <div class="articles-container">
        <Loader v-if="loading" />
        <router-link
          v-else
          v-for="(article, index) in filteredArticles"
          :key="index"
          :to="{
            name: 'article',
            params: { articleId: article.id },
          }"
          class="article"
        >
          <article-preview :name="article.title" :content="article.content" />
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
      var returnArray: ArticleShape[] = [];
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
      if (selectedFilter.value == "az") {
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
      if (selectedFilter.value == "za") {
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
            new Date(a.publishDate).valueOf() -
            new Date(b.publishDate).valueOf()
          );
        });
      }
      if (selectedFilter.value == "old") {
        returnArray = returnArray.sort((a, b) => {
          return (
            new Date(b.publishDate).valueOf() -
            new Date(a.publishDate).valueOf()
          );
        });
      }
      return returnArray;
    });

    return { articles, filteredArticles, searchQuery, selectedFilter, loading };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

a {
  margin: 10px;
}
.articles-container {
  margin-top: 30px;
  display: grid;
  justify-content: center;
  grid-column: 1rem;
  grid-row-gap: 1rem;
  grid-template-columns: auto auto auto;
}

.content-container {
  min-height: calc(100vh - 257.5px);
}

.search-input {
  padding: 10px;
  width: 25%;
  border: none;
  background-color: transparent;
  color: $trit-gray;
  border-bottom: 1px solid $trit-gray;
}
.search-bar {
  margin-right: 45px;
  display: flex;
  justify-content: right;
}
</style>
