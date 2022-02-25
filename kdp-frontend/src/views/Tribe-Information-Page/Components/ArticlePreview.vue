<template>
  <div>
    <div class="article">
      <h4 class="title">{{ name }}</h4>
      <p class="article-p">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae,
        enim aperiam. Molestiae minima praesentium ipsum similique vel quod hic
        facere?
      </p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "ArticlePreview",
  props: {
    name: String,
  },
};
</script>

<style lang="scss" scoped>
.article {
  height: 200px;
  width: 400px;
  background-color: white;
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
