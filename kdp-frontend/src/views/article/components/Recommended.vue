<template>
  <div class="recommended">
  <!-- Todo: Een loop over recommended articles-->
    <h3 class="recommended-title">{{$t("article-page.recommended-title")}}</h3>
    <div class="recommended-article">
      <img class="recommended-image" src="" :alt="$t('article-page.recommended-image-alt')">
      <h4 class="recommended-article-title">Dont use console.log anymore</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recommended"
}
</script>

<style
    scoped
    lang="scss"
    src="@/styles/pageStyles/article/RecommendedView.scss"
/>