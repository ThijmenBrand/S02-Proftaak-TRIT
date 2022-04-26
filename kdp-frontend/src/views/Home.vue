<template>
  <div class="main">
    <div class="flex-container">
      <div class="left-flexbox">
        <div class="interesting-tribes-container">
          <p>hmm ja hele interesante tribes</p>
        </div>
        <div class="about-container">
          <h1>About us</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam
            aperiam cumque repudiandae qui libero ab accusamus deleniti nulla ad
            facilis adipisci rem aliquam repellendus, quas, esse, quos commodi
            labore vitae praesentium odit ea necessitatibus minus. Vel eius ab
            dicta perferendis eos esse, labore laudantium aperiam facilis culpa
            velit harum consequuntur.
          </p>
        </div>

        <div class="highlighted-articles">
          <h1>Uitgelichte artikelen</h1>
          <div class="content-container">
      <div v-if="loading">
        <Loader />
      </div>
      <div
        class="articles-container"
        v-else-if="!loading && articles.length > 0"
      >
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
      <p class="article-error" v-else>{{ $t("article.article-error") }}</p>
    </div>
        </div>
      </div>

      <div class="right-flexbox">
        <div class="highlighted-rockstars">
        <p>hier komen highlighted rockstars</p>
      </div>
      </div>
      
    </div>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import Loader from "@/components/loader/Loader.vue";
import ArticleShape from "@/models/Article";
import ArticlePreview from "@/components/articlePreview/ArticlePreview.vue";

export default {
  components: {
    ArticlePreview,
    Loader,
  },

  setup() {
    const store = useStore();
    const loading = computed(() => store.getters["isLoading"]);

    onMounted(async () => {
      await store.dispatch("getAllArticles");
    });

    const articles = computed((): ArticleShape[] => {
      return store.getters["getAllArticles"];
    });


    return { store, articles, loading};
  },
};
</script>

<style scoped lang="scss" src="@/styles/pageStyles/homepage/homepage.scss" />
