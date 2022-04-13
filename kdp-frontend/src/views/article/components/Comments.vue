<template>
  <div class="comments">
    <h3 class="comments-title">Comments</h3>
    <form action="">
      <div class="input-container">
        <textarea class="comment-input" placeholder="Wat vond je van dit aritikel?"></textarea>
        <button class="comment-button btn-yellow" type="submit">Plaats</button>
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