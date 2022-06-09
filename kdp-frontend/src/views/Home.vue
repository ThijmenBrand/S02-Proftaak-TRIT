
<template>
  <div class="background-container">
    <Loader v-if="loading" />
    <div v-else class="content-container">
      <div class="left-pannel">
        <div class="featured-tribes-container">
          <div class="featured-tribes">
            <h4 class="featured-tribes-header">{{ $t("home.featured-tribes") }}</h4>
            <div class="featured-tribes-content">
              <div
                  v-for="(tribe, index) in tribesList.slice(0, 3)"
                  :key="index"
                  class="tribe-item"
              >
                <router-link
                    :to="{
                  name: 'tribe',
                  params: { tribe: tribe.id },
                }"
                    class="tribe-link"
                >
                  {{ tribe.displayName }}
                </router-link>
              </div>
            </div>
          </div>

          <hr class="line" />
        </div>
        <div class="about-container">
          <h3>{{ $t("home.about-us.header") }}</h3>
          <p>{{ $t("home.about-us.text") }}</p>
        </div>
        <div class="highlighted-articles">
          <h3>
            {{ $t("highlighted-articles") }}
          </h3>
          <div class="articles-wrapper">
            <div class="articles-container" v-if="articles.length > 0">
              <router-link
                v-for="(article, index) in articles"
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
            <p class="article-error" v-else>
              {{ $t("article.article-error") }}
            </p>
          </div>
        </div>
      </div>
      <div class="right-pannel">
        <h3>{{ $t("home.featured-rockstars") }}</h3>
        <div class="highlighted-rockstars">
          <profiletag
            v-for="(rockstar, index) in rockstars"
            :key="index"
            :id="rockstar.id"
            :name="rockstar.displayName"
            :image="rockstar.image"
            :role="rockstar.role"
            :view-details="false"
            class="profile-tag"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, onMounted, ref} from "vue";
import { useStore } from "vuex";
import ArticleShape from "@/models/Article";
import ArticlePreview from "@/components/articlePreview/ArticlePreview.vue";
import { TribeShape } from "@/models/Tribe";
import { RockstarShape } from "@/models/Rockstar";
import profiletag from "@/components/profileTag/square-tag.vue";
import Loader from "@/components/loader/Loader.vue";

export default {
  components: {
    ArticlePreview,
    profiletag,
    Loader,
  },

  setup() {
    const store = useStore();
    const loading = ref(true);

    onMounted(async () => {
      document.title = "RockstarsIT KDP";
      store.commit("SET_CURRENT_PAGE", 1);
      await store.dispatch("getAllArticles", 6);
      await store.dispatch("getAllRockstars");
      await store.dispatch("tribes/getAllTribes");
      
      loading.value = false;

    });

    const articles = computed((): ArticleShape[] => {
      return store.getters["getAllArticles"];
    });

    const rockstars = computed((): RockstarShape[] => {
      return store.getters["getAllRockstars"];
    });

    const tribesList = computed((): TribeShape[] => {
      const list = store.getters["tribes/getAllTribesList"];
      return list;
    });
    
    return { store, articles, loading, tribesList, rockstars };
  }
};
</script>

<style scoped lang="scss" src="@/styles/pageStyles/homepage/homepage.scss" />
