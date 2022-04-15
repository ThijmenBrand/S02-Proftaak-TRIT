<template>
  <div class="rockstar">
    <img
      class="rockstar-image"
      :alt="
        $t('article-page.rockstar-image', {
          name: rockstar.name,
        })
      "
      :src="rockstar.image"
    />
    <div class="rockstar-info">
      <p>{{ rockstar.name }}</p>
      <div class="socials">
        <a
          v-if="rockstar.twitter != null"
          class="social-component"
          :href="rockstar.twitter"
        >
          <img
            class="social-image"
            src="@/assets/images/socials/twitter.svg"
            alt="Twitter"
          />
        </a>
        <a
          v-if="rockstar.linkedIn != null"
          class="social-component"
          :href="rockstar.linkedIn"
        >
          <img
            class="social-image"
            src="@/assets/images/socials/linkedin.svg"
            alt="LinkedIn"
          />
        </a>
        <a
          v-if="rockstar.email != null"
          class="social-component"
          :href="'mailto:' + rockstar.email"
        >
          <img
            class="social-image"
            src="@/assets/images/socials/email.svg"
            :alt="rockstar.email"
          />
        </a>
        <a
          v-if="rockstar.phone != null"
          class="social-component"
          :href="'tel:' + rockstar.phone"
        >
          <img
            class="social-image"
            src="@/assets/images/socials/phone.svg"
            :alt="rockstar.phone"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { RockstarShape } from "@/models/Rockstar";

export default {
  name: "RockstarArticleView",
  props: {
    rockstar: Object as () => RockstarShape,
  },
};
</script>

<style
  scoped
  lang="scss"
  src="@/styles/pageStyles/article/RockstarArticleView.scss"
/>
