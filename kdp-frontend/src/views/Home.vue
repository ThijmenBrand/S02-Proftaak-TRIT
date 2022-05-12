<template>
  <div class="main">
    <div class="flex-container">
      <div class="left-flexbox">
        <div class="interesting-tribes-container">
<<<<<<< HEAD
          <Loader v-if="loading" />
          <h3 v-else v-for="(tribe, index) in tribesList" :key="index">
            <router-link
              :to="{
                name: 'tribe',
                params: { tribe: tribe.id },
              }"
              class="tribe-link"
            >
              {{ tribe.name }}
            </router-link>
          </h3>
        </div>
        <div class="about-container">
          <h1>{{$t("about-us")}}</h1>
=======
          <p>hmm ja hele interesante tribes</p>
        </div>
        <div class="about-container">
          <h1>About us</h1>
>>>>>>> e137f7e99dad98d02e4f3ed16ed84231c2d6c409
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
<<<<<<< HEAD
          <h1>
            {{ $t("highlighted-articles") }}
          </h1>
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
            <p class="article-error" v-else>
              {{ $t("article.article-error") }}
            </p>
          </div>
=======
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
>>>>>>> e137f7e99dad98d02e4f3ed16ed84231c2d6c409
        </div>
      </div>

      <div class="right-flexbox">
        <div class="highlighted-rockstars">
<<<<<<< HEAD
          <p>hier komen highlighted rockstars</p>
          <profiletag
          v-for="(rockstar, index) in rockstars"
          :key="index"
          :id="rockstar.id"
          :name="rockstar.name"
          :image="rockstar.image"
          :role="rockstar.role"
          class="profile-tag"
        />
        </div>
      </div>
=======
        <p>hier komen highlighted rockstars</p>
      </div>
      </div>
      
>>>>>>> e137f7e99dad98d02e4f3ed16ed84231c2d6c409
    </div>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import Loader from "@/components/loader/Loader.vue";
import ArticleShape from "@/models/Article";
import ArticlePreview from "@/components/articlePreview/ArticlePreview.vue";
<<<<<<< HEAD
import { TribeShape } from '@/models/Tribe';
import { RockstarShape } from '@/models/Rockstar';
import profiletag from "@/components/profileTag/Profiletag.vue"
=======
>>>>>>> e137f7e99dad98d02e4f3ed16ed84231c2d6c409

export default {
  components: {
    ArticlePreview,
    Loader,
<<<<<<< HEAD
    profiletag,
=======
>>>>>>> e137f7e99dad98d02e4f3ed16ed84231c2d6c409
  },

  setup() {
    const store = useStore();
    const loading = computed(() => store.getters["isLoading"]);

    onMounted(async () => {
<<<<<<< HEAD
      store.commit("SET_CURRENT_PAGE", 1);
      await store.dispatch("getAllArticles", 6);
      await store.dispatch("getAllRockstars");
      await store.dispatch("tribes/getAllTribes");
=======
      await store.dispatch("getAllArticles");
>>>>>>> e137f7e99dad98d02e4f3ed16ed84231c2d6c409
    });

    const articles = computed((): ArticleShape[] => {
      return store.getters["getAllArticles"];
    });

<<<<<<< HEAD
    
    
    const rockstars = computed((): RockstarShape[] => {
      return store.getters["getAllRockstars"];
    }
    );
    
    

    const tribesList = computed((): TribeShape[] => {
      const list = store.getters["tribes/getAllTribesList"];
      return list;
    });

    console.log(rockstars);
    return { store, articles, loading, tribesList, rockstars };
=======

    return { store, articles, loading};
>>>>>>> e137f7e99dad98d02e4f3ed16ed84231c2d6c409
  },
};
</script>

<style scoped lang="scss" src="@/styles/pageStyles/homepage/homepage.scss" />
