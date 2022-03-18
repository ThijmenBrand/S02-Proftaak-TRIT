<template>
  <BaseNav />
  <div class="main-content">
    <router-view />
  </div>
</template>

<script>
import BaseNav from '@/components/navigation/BaseNavigation.vue';

export default {
  components: {
    BaseNav,
  },
};
</script>

<style lang="scss">
<<<<<<< HEAD
@import "@/styles/main.scss";
=======
@import '@/styles/main.scss';
>>>>>>> front-end
</style>
