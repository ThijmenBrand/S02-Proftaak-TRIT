<template>
  <BaseNav />
  <div class="main-content">
    <router-view />
  </div>
</template>

<script>
import BaseNav from "@/components/navigation/BaseNavigation.vue";
import { onMounted } from "vue";
import SetLocalStorage from "@/config/SetLocalstorage";

export default {
  components: {
    BaseNav,
  },
  setup() {
    onMounted(() => {
      SetLocalStorage();
    });
  },
};
</script>

<style lang="scss">
@import "styles/main.scss";
@import "styles/fonts.css";
</style>
