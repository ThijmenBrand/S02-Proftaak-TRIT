<template>
  <div class="comments">
    <h3 class="comments-title">{{ $t("article-page.comment-title") }}</h3>
    <div class="error-message-container">
      <p class="empty-post-error" v-if="EmptyPostError" >{{ $t("article-page.comment-error") }}</p>
    </div>
    <div v-if="LoggedIn" class="comment-input-container">
      <div class="input-container">
        <textarea
          class="comment-input"
          :placeholder="$t('article-page.comment-placeholder')"
          v-model="commentContent"
          maxlength="250"
          @click="RemoveErrorMsg"
        ></textarea>
        <div class="button-container">
          <button
            class="comment-button btn-yellow"
            type="submit"
            @click="submitComment()"
          >
            {{ $t("article-page.button-text") }}
          </button>
        </div>
      </div>
        <div class="remaining-char-container">
          <p class="remaining-char">{{GetRemainingChar()}} characters remaining</p>
        </div>
    </div>
    <div class="login-message-container" v-else>
      <p>{{ $t("article-page.comment-login-message")}} </p>
      <div class="login-button-container">
        <button class="login-button btn-yellow"
          @click="login"
          type="login"
        >
          Login
        </button>
      </div>
    </div>
    <div v-for="(comment, index) in comments" :key="index" class="comment">
      <h4 class="user-title">{{ comment.userName }}</h4>
      <div class="comment-content">
        <p class="comment-text">{{ comment.commentText }}</p>
        <p class="comment-text">{{ date(comment.commentDate) }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, Ref, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { CommentShape } from "@/models/Comment";
import getCustomDateTime from "@/services/customDateTime";
import { getAccountInfo, useIsAuthenticated, useMsal } from "@/services/msal/msal";
import { AccountInfo } from "@azure/msal-common";
import LocalStorageHandler from "@/services/localStorageHelper/LocalStorageHelper"
import { loginRequest } from '@/config/authConfig';

export default {
  name: "Comments",
  props: {
    comments: {
      type: Array as () => CommentShape[],
      required: false,
    },
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const EmptyPostError = ref(false);
    const commentContent = ref<string>("");
    const LoggedIn: Ref<boolean> = useIsAuthenticated();
    const loggedUser: AccountInfo[] = getAccountInfo();

    const submitComment = () => {
      if (commentContent.value == "") {
        EmptyPostError.value = true;
        return
        };
      if (!LoggedIn) return;

      const commentParams: CommentShape = {
        articleId: route.params.articleId.toString(),
        userId: loggedUser[0].homeAccountId,
        userName: loggedUser[0].username,
        commentText: commentContent.value,
      };
      store.dispatch("article/postComment", commentParams);
      commentContent.value = "";
    };
    
    const date = (date: string): string => {
      if (date) {
        return getCustomDateTime(date);
      }
      return "";
    };
    
    function GetRemainingChar(){
      var length = commentContent.value.length;
      return 250-length;
    }

    function RemoveErrorMsg(){
      EmptyPostError.value = false;
    }
    
    const { instance } = useMsal();

    const login = () => {
      instance.loginPopup(loginRequest).then(result => {
        LocalStorageHandler.setItem('user', result); 
        });
    }
    return { date, commentContent, submitComment, LoggedIn, GetRemainingChar, login, RemoveErrorMsg, EmptyPostError };
  },
};
</script>

<style scoped lang="scss" src="@/styles/pageStyles/article/Comments.scss" />
