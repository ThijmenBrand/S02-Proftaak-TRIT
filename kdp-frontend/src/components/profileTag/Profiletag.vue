<template>
  <div class="profile-tag">
    <div class="image">
      <img class="profile-image" :src="`data:image/png;base64,${image}`" />
    </div>
    <p class="rockstar">{{ name }}</p>
    <p class="rockstar-role ">{{ role }}</p>
  </div>
</template>

<script lang="ts">
export default {
  name: "Profiletag",
  props: {
    name: String,
    image: String,
    role: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped src="@/styles/profile-tag/profile-tag.scss" />
