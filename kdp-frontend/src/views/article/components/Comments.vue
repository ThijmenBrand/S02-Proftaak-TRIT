<template>
  <div class="comments">
    <h3 class="comments-title">{{$t("article-page.comment-title")}}</h3>
    <form action="">
      <div class="input-container">
        <textarea class="comment-input" :placeholder="$t('article-page.comment-placeholder')"></textarea>
        <button class="comment-button btn-yellow" type="submit">{{$t("article-page.button-text")}}</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Comments"
}
</script>

<style
    scoped
    lang="scss"
    src="@/styles/pageStyles/article/Comments.scss"
/>