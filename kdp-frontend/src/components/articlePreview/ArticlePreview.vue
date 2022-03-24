<template>
  <div>
    <div class="article">
      <img
      src="@/assets/logo.svg"
	 style="object-fit:scale-down;
            width:400px;
            height:300px;"
      class="shadow logo-style st0 st1 st5"
      id="rs-logo"
      />
      <h4 class="title">{{ name }}</h4>
      <p class="article-p">
        {{ limitContent(content) }}
      </p>
      <p class="rockstarName-p">{{rockstarName}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import rockstar from '@/views/rockstars/store/rockstars';
export default {
  name: "ArticlePreview",
  props: {
    name: String,
    content: String,
    rockstarName: String,
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
@import "@/styles/variables.scss";
.article {
  height: 500px;
  width: 400px;
  border: 1px solid #3E3E3E;
  background-color: $trit-gray;
    margin: 5px;
}
.article-p {
  color: $trit-white;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
}
.rockstarName-p {
  color: $trit-white;
  font-size: 8;
  padding-left: 15px;
  color: $trit-yellow;
}
.title {
  color: $trit-yellow;
  text-align: center;
  padding-top: 5px;
}
</style>
