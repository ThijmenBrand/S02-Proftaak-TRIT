<template>
  <div class="cookie-banner-container">
    <div class="Cookie-banner-content-container">
      <p>
        {{ $t("cookie-message") }} -
        <span class="cookie-banner-learn-more">{{
          $t("cookie-message.learn-more")
        }}</span>
      </p>
      <div>
        <button class="decline" @click="declineCookies()">
          {{ $t("cookie-message.decline") }}
        </button>
        <button class="accept" @click="acceptCookies()">
          {{ $t("cookie-message.accept") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  name: "cookieBanner",
  setup() {
    const store = useStore();

    function acceptCookies() {
      store.commit("SET_COOKIE_ACCEPTED", true);
    }
    function declineCookies() {
      console.log("decline");
      store.commit("SET_COOKIE_ACCEPTED", false);
    }

    return { acceptCookies, declineCookies };
  },
};
</script>
