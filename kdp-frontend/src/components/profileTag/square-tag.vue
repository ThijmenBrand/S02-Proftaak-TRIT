<template>
  <router-link
    v-if="id"
    :to="{
      name: 'rockstar',
      params: { rockstarId: id },
    }"
  >
    <div class="profile-tag-container">
      <img
        class="profile-image"
        :src="image"
        :alt="$t('rockstar-page.profile-picture-alt-text', { name: this.name })"
      />
      <div class="details-container">
        <p class="rockstar">{{ name }}</p>
        <p class="rockstar-role">{{ role }}</p>
        <p class="desc">{{ cutDesc(desc) }}</p>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
export default {
  name: "Profiletag",
  props: {
    id: String,
    name: String,
    image: String,
    desc: String,
    role: {
      type: String,
      default: "",
    },
  },
  setup() {
    const cutDesc = (desc: string) => {
      return desc.length < 50 ? desc : desc.slice(0, 50);
    };

    return { cutDesc };
  },
};
</script>

<style
  lang="scss"
  scoped
  src="@/styles/componentStyles/profile-tag/square-profile-tag.scss"
/>
