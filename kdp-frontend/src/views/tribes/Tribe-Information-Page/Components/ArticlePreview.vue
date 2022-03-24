<template>
  <div>
    <div class="article">
      <img
      src="@/assets/logo.svg"
      class="shadow logo-style st0 st1 st5"
      id="rs-logo"
      />
      <h4 class="title">{{ name }}</h4>
      <p class="article-p">
        {{ content }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "ArticlePreview",
  props: {
    name: String,
    content: String,
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.article {
  height: 550px;
  width: 400px;
  border: 1px solid #3E3E3E;
  background-color: $trit-gray;
}
.article-p {
  color: $trit-white;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 15;
}
.title {
  color: $trit-yellow;
  text-align: center;
  padding-top: 5px;
}
</style>
