<template>
  <div class="rockstar">
    <a @click="router.push('/rockstar/' + rockstar.id)">
      <img
      class="rockstar-image"
      :alt="
        $t('article-page.rockstar-image', {
          name: rockstar.name,
        })
      "
      :src="`data:image/png;base64,${rockstar.image}`"
    />
    </a>
    <div class="rockstar-info">
      <p>{{ rockstar.displayName }}</p>
      <div class="socials" v-if="rockstar.rockstarSocial != null">
          <a
            v-if="rockstar.rockstarSocial.twitterLink != null"
            :href="rockstar.rockstarSocial.twitterLink"
            class="social-component"
          >
            <img
              :alt="$t('rockstar-page.socials.twitter-icon-alt-text')"
              class="social-image"
              src="@/assets/images/socials/twitter.svg"
            />
          </a>
          <a
            v-if="rockstar.rockstarSocial.linkedInLink != null"
            class="social-component"
            :href="rockstar.rockstarSocial.linkedInLink"
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
            v-if="rockstar.rockstarSocial.facebookLink != null"
            class="social-component"
            :href="rockstar.rockstarSocial.facebookLink"
          >
            <img
              class="social-image"
              src="@/assets/images/socials/facebook.svg"
              :alt="rockstar.rockstarSocial.facebookLink"
            />
          </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { RockstarShape } from "@/models/Rockstar";
import router from '@/router';

export default {
  name: "RockstarArticleView",
  props: {
    rockstar: Object as () => RockstarShape,
  },
  setup() {
    return { router }
  },
};
</script>

<style
  scoped
  lang="scss"
  src="@/styles/pageStyles/article/RockstarArticleView.scss"
/>
