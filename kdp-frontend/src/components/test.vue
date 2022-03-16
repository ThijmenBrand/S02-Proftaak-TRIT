<template>
  <h1>Hello world</h1>
  <heloo msg="Welcome to Your Vue.js + TypeScript App" />
</template>

<script>
import heloo from './HelloWorld.vue';

export default {
  components: { heloo },
};
</script>

<style scoped>
h1 {
  color: green;
}
</style>
