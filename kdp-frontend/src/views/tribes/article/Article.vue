<template>
  <div class="header-wrapper">
    <div class="title-category">
      <h1 class="page-title">{{ articleDetails.articleTitle }}</h1>
    </div>
    <ProfileTag :name="articleWriter.rockstarName"></ProfileTag>
  </div>
  <div class="content-container">
    <Blog
      v-if="articleDetails.articleCategory == 'blog'"
      :articleContent="articleDetails.articleContent"
    />
    <Podcast v-else-if="articleDetails.articleCategory == 'podcast'" />
    <Video v-else-if="articleDetails.articleCategory == 'video'" />
  </div>
</template>

<script lang="ts">
import ProfileTag from '@/components/Profiletag.vue';
import ArticleShape from '@/models/Article';

import Blog from './components/Blog.vue';
import Podcast from './components/Podcast.vue';
import Video from './components/video.vue';

import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { computed } from 'vue';
import { RockstarShape } from '@/models/Rockstar';
export default {
  name: 'Article-view',
  components: {
    Blog,
    Podcast,
    Video,
    ProfileTag,
  },
  setup() {
    const route = useRoute();
    const store = useStore();

    const articleId = computed(() => {
      return route.params.articleId;
    });

    const articleDetails = computed((): ArticleShape | undefined => {
      const allArticles: ArticleShape[] =
        store.getters['tribes/getAllArticles'];

      const applyingArticle: ArticleShape | undefined = allArticles.find(
        (a) => a.id === articleId.value
      );

      console.log(applyingArticle);

      return applyingArticle;
    });

    const articleWriter = computed((): RockstarShape => {
      const allRockstars: RockstarShape[] =
        store.getters['tribes/getAllRockstars'];

      const applyingRockstar: RockstarShape | undefined = allRockstars.find(
        (a) => a.id == articleDetails.value?.writer
      );

      return applyingRockstar != undefined
        ? applyingRockstar
        : {
            id: '',
            name: 'unknown',
            description: '',
          };
    });

    return { articleId, articleDetails, articleWriter };
  },
};
</script>

<style scoped lang="scss">
.header-wrapper {
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content-container {
  padding: 30px;
}
.title-category {
  display: inline-block;
}
</style>
