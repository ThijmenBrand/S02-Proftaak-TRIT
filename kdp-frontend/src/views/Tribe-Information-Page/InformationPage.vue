<template>
  <div class="information-page-main">
    <div class="tribes-overview">
      <h3 class="tribe-title">Vue.js</h3>
      <div class="profile-container">
        <profiletag
          v-for="profile in profiles"
          :key="profile"
          :name="profile"
        />
      </div>
    </div>

    <div class="articles-overview">
      <h3 class="articles-overview-title">Articles</h3>
      <div class="articles-container">
        <article-preview
          v-for="article in articles"
          :key="article"
          :name="article"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ArticlePreview from "./Components/ArticlePreview.vue";
import Profiletag from "./Components/Profiletag.vue";
export default {
  components: {
    Profiletag,
    ArticlePreview,
  },
  setup() {
    const profiles = ["Profile1", "Profile2", "Profile3"];
    const articles = ["Article1", "Article2", "Article3", "Article4"];
    return { profiles, articles };
  },
};
</script>

<style scoped>
p {
  color: white;
  margin: 0;
}
.tribes-overview {
  background-color: yellow;
  width: auto;
  height: 300px;
  margin: 0%;
  padding: 0%;
}
.articles-overview {
  background-color: black;
  height: 1000px;
  margin: 0%;
  padding: 0%;
}
.tribe-title {
  padding: 20px;
  padding-left: 40px;
}
.profile-container {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.articles-overview-title {
  text-align: center;
  margin: 0;
  color: white;
  padding-top: 20px;
}
.articles-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 40px;
}
</style>
