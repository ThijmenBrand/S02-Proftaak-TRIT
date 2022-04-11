<template>
  <div class="rockstar-pane">
    <div class="rockstar-card">
      <div class="col-image">
        <img
          class="profile-image"
          :src="`data:image/png;base64,${rockstar.image}`"
        />
      </div>
      <div class="col-information">
        <div class="row-name">
          <a class="DIN2014-Bold">{{ rockstar.name }}</a>
        </div>
        <div class="row-description">
          <a class="DIN2014-Regular">{{ rockstar.description }}</a>
        </div>

        <div class="col-socials">

          <a  v-if="rockstar.twitter != null" class="social-component" :href="rockstar.twitter">
            <img class="social-image" src="@/assets/images/socials/twitter.svg"/>
          </a>
          
          <a v-if="rockstar.linkedIn != null" class="social-component" :href="rockstar.linkedIn">
            <img class="social-image" src="@/assets/images/socials/linkedin.svg"/>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { RockstarShape } from "@/models/Rockstar";

export default {
  name: "RockstarView",
  props: {
    rockstar: Object as () => RockstarShape,
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/main.scss";
@import "@/styles/variables.scss";
@import "../../styles/fonts.css"; /* bij het geven van een @/ krijg ik een compiler error */
@import "@/styles/RockstarInformationPage/RockstarView.scss";
</style>