<template>
  <BaseNav />
  <div class="main-content">
    <router-view />
  </div>
  <bannerVue v-if="cookieAccepted" />
</template>

<script>
import BaseNav from "@/components/navigation/BaseNavigation.vue";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import SetLocalStorage from "@/config/SetLocalstorage";
import bannerVue from "./components/cookieBanner/banner.vue";
import LocalStorageHandler from "./services/localStorageHelper/LocalStorageHelper";

export default {
  components: {
    BaseNav,
    bannerVue,
  },
  setup() {
    const store = useStore();
    const cookieAccepted = computed(
      () => store.getters["cookieAccepted"] == ""
    );

    onMounted(() => {
      SetLocalStorage();
    });

    return { cookieAccepted };
  },
};
</script>

<style lang="scss">
@import "styles/main.scss";
@import "styles/fonts.css";
@import "styles/componentStyles/cookie/cookie.scss";
</style>
