<template>
  <BaseNav />
  <div class="main-content">
    <router-view />
  </div>
  <vue-cookie-accept-decline
    :debug="false"
    :disableDecline="false"
    @clicked-accept="cookieClickedAccept"
    @clicked-decline="cookieClickedDecline"
    :showPostponeButton="false"
    elementId="cookie-banner"
    ref="cookieBanner"
    transitionName="slideFromBottom"
    type="bar"
  />
</template>

<script>
import BaseNav from "@/components/navigation/BaseNavigation.vue";
import { useStore } from "vuex";
import { onMounted } from "vue";
import SetLocalStorage from "@/config/SetLocalstorage";

export default {
  components: {
    BaseNav,
  },
  setup() {
    const store = useStore();

    onMounted(() => {
      SetLocalStorage();
    });

    function cookieClickedAccept() {
      store.commit("SET_COOKIE_ACCEPTED", true);
    }
    function cookieClickedDecline() {
      store.commit("SET_COOKIE_ACCEPTED", false);
    }

    return { cookieClickedAccept, cookieClickedDecline };
  },
};
</script>

<style lang="scss">
@import "styles/main.scss";
@import "styles/fonts.css";
@import "styles/componentStyles/cookie/cookie.scss";
</style>
