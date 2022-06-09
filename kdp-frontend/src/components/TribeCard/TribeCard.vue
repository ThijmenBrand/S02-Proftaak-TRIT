<template>
  <router-link
      :to="{
                name: 'tribe',
                params: { tribe: id },
              }">
    <div class="card">
      <img
          class="icon"
          src="@/assets/images/icon-code.svg"
      />
      <h3 class="subtext">
        {{ name }}
      </h3>
    </div>
  </router-link>
</template>

<script lang="ts">
export default {
  name: "TribeCard",
  props: {
    name: String,
    id: String,
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/componentStyles/TribeCard/TribeCard.scss";
</style>