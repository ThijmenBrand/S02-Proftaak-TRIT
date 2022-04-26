<template>
  <div class="rockstar-pane">
    <div class="rockstar-card">
      <div class="col-image">
        <img
            :alt="
            $t('rockstar-page.profile-picture-alt-text', {
              name: rockstar.name,
            })
          "
            :src="rockstar.image"
            class="rockstar-profile-image"
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
          <a v-if="rockstar.twitter != null" :href="rockstar.twitter" class="social-component">
            <img alt="Twitter" class="social-image" src="@/assets/images/socials/twitter.svg"/>
          </a>
          <a v-if="rockstar.linkedIn != null" :href="rockstar.linkedIn" class="social-component">
            <img alt="LinkedIn" class="social-image" src="@/assets/images/socials/linkedin.svg"/>
          </a>
          <a v-if="rockstar.email != null" :href="'mailto:' + rockstar.email" class="social-component">
            <img :alt="rockstar.email" class="social-image" src="@/assets/images/socials/email.svg"/>
          </a>
          <a v-if="rockstar.phone != null" :href="'tel:' + rockstar.phone" class="social-component">
            <img :alt="rockstar.phone" class="social-image" src="@/assets/images/socials/phone.svg"/>
          </a>
        </div>
        <div class="row-ondemand">
          <div class="col-ondemand-text">OnDemand aanvraag</div>
          <div class="col-ondemand-icon">
            <img src="@/assets/images/icon-fastforward.svg">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {RockstarShape} from "@/models/Rockstar";

export default {
  name: "RockstarView",
  props: {
    rockstar: Object as () => RockstarShape,
  },
};
</script>

<style
    lang="scss"
    scoped
    src="@/styles/pageStyles/RockstarInformationPage/RockstarView.scss"
/>
