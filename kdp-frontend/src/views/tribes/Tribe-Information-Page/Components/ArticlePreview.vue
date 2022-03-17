<template>
  <div>
    <div class="article">
      <h4 class="title">{{ name }}</h4>
      <p class="article-p">
        {{ content }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ArticlePreview',
  props: {
    name: String,
    content: String,
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.article {
  height: 200px;
  width: 400px;
  background-color: $trit-white;
}
.article-p {
  color: $trit-black;
  padding: 10px;
}
.title {
  color: $trit-black;
  text-align: center;
  padding-top: 10px;
}
</style>
