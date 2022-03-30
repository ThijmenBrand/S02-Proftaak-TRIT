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
          <article-preview
            :name="article.title"
            :content="article.content"
            :rockstarName="article.rockstarName"
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
  justify-self: center;
}
.articles-container {
  margin-top: 30px;
  display: grid;
  justify-content: center;
  grid-column: 1rem;
  grid-row-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(415px, 1fr));
}

.content-container {
  min-height: calc(100vh - 226.5px);
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
.custom-select {
  border-bottom: 1px solid #232323;
  display: flex;
}

.select {
  border: none;
  background: none;
}

.select:focus {
  outline: 0;
}
.select-item {
  position: absolute;
  background-color: $trit-gray;
  color: $trit-yellow;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 99;
}

.select-item div:hover,
.same-as-selected {
  background-color: white;
}

@media only screen and (max-width: 700px) {
  .search-input {
    width: 60%;
  }
}

@media only screen and (min-width: 1750px) {
  .content-container {
    margin: 0 230px;
  }
}
</style>
