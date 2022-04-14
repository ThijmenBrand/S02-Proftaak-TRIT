<template>
  <div class="comments">
    <h3 class="comments-title">{{$t("article-page.comment-title")}}</h3>
    <form action="">
      <div class="input-container">
        <textarea class="comment-input" :placeholder="$t('article-page.comment-placeholder')"></textarea>
      </div>
      <div class="button-container">
        <button class="comment-button btn-yellow" type="submit">{{$t("article-page.button-text")}}</button>
      </div>
    </form>
    <div v-for="(comment, index) in comments" :key="index" class="comment">
      <h4 class="user-title">{{ comment.userName }}</h4>
      <div class="comment-content">
        <p class="comment-text">{{comment.commentText}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {CommentShape} from "@/models/Comment";

export default {
  name: "Comments",
  props: {
    comments: {
      type: CommentShape,
      required: false
    }
  }
}
</script>

<style
    scoped
    lang="scss"
    src="@/styles/pageStyles/article/Comments.scss"
/>