<template>
  <div class="article">
    <h4 class="title">{{ name }}</h4>
    <p class="article-p">
      {{ limitContent(content) }}
    </p>
  </div>
</template>

<script lang="ts">
export default {
  name: "ArticlePreview",
  props: {
    name: String,
    content: String,
  },
  setup() {
    const limitContent = (content: string): string => {
      return content.length < 250 ? content : content.substring(0, 250) + "...";
    };

    return { limitContent };
  },
};
</script>

<style lang="scss" scoped>
.article {
  height: 200px;
  width: 300px;
  background-color: white;
  display: inline-block;
  margin: 10px;
}
.article-p {
  color: black;
  padding: 10px;
}
.title {
  color: black;
  text-align: center;
  padding-top: 10px;
}
</style>
