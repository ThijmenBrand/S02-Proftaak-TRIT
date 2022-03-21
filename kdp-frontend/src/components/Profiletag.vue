<template>
  <div>
    <div class="image"></div>
    <p class="rockstar">{{ name }}</p>
  </div>
</template>

<script lang="ts">
export default {
  name: "Profiletag",
  props: {
    name: String,
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.image {
  height: 60px;
  width: 60px;
  background-color: white;
  border-radius: 50%;
}
.rockstar {
  color: $trit-gray;
}
p {
  text-align: center;
}
</style>
