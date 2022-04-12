<template>
    <router-link
    v-if="id"
    :to="{
      name: 'rockstar',
      params: { rockstarId: id },
    }"
    >
	  <div class="profile-tag-container">
			<div class="profile-image-container">
			  <img
				  class="profile-image"
				  :src="`data:image/png;base64,${image}`"
				  :alt="$t('rockstar-page.profile-picture-alt-text', { name: this.name })"
			  />
			  <p class="rockstar">{{ name }}</p>
			  <p class="rockstar-role">{{ role }}</p>
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
    role: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped/>
