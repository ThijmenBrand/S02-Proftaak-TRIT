<template>
  <BaseNav @open-cookie-selector="showCookieBannerAgain()" />
  <div class="main-content">
    <router-view />
  </div>
  <bannerVue v-if="showCookieBanner" />
</template>

<script>
import BaseNav from "@/components/navigation/BaseNavigation.vue";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import SetLocalStorage from "@/config/SetLocalstorage";
import bannerVue from "./components/cookieBanner/banner.vue";

export default {
  components: {
    BaseNav,
    bannerVue,
  },
  setup() {
    const store = useStore();
    const showCookieBanner = computed(() => store.getters["showCookieBanner"]);
    const showCookieBannerAgain = () => {
      store.commit("SET_COOKIE_BANNER_SHOW_FALSE");
    };
    onMounted(() => {
      SetLocalStorage();
    });

    return { showCookieBanner, showCookieBannerAgain };
  },
};
</script>

<style lang="scss">
@import "styles/main.scss";
@import "styles/fonts.css";
@import "styles/componentStyles/cookie/cookie.scss";
</style>
