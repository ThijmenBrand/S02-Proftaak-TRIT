<template>
  <div class="container">
    <div class="logo">
      <img src="@/assets/logo.png" alt="RockstarsIT Logo" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  components: {

  }
};
</script>

<style scoped>
.container {
  background-color: #ffe000;
  width: 100%;
  height: 12em;
}

.logo {
  margin: 0;
  padding: 0;
}

.logo img {
  height: calc(12em - (20px / 2));
  filter: drop-shadow(2px 2px 2px gray)
}
</style>