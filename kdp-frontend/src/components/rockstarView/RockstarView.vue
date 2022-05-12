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
            <img :alt="$t('rockstar-page.socials.twitter-icon-alt-text')" class="social-image"
                 src="@/assets/images/socials/twitter.svg"/>
          </a>
          <a v-if="rockstar.linkedIn != null" :href="rockstar.linkedIn" class="social-component">
            <img :alt="$t('rockstar-page.socials.linkedin-icon-alt-text')" class="social-image"
                 src="@/assets/images/socials/linkedin.svg"/>
          </a>
          <a v-if="rockstar.email != null" :href="'mailto:' + rockstar.email" class="social-component">
            <img :alt="$t('rockstar-page.socials.email-icon-alt-text')" class="social-image"
                 src="@/assets/images/socials/email.svg"/>
          </a>
          <a v-if="rockstar.phone != null" :href="'tel:' + rockstar.phone" class="social-component">
            <img :alt="$t('rockstar-page.socials.phone-icon-alt-text')" class="social-image"
                 src="@/assets/images/socials/phone.svg"/>
          </a>
        </div>
        <div id="open-ondemand-modal" class="row-ondemand" @click="OpenModal">
          <div class="col-ondemand-text">{{ $t('rockstar-page.ondemand-button-text') }}</div>
          <div class="col-ondemand-icon">
            <img
                :alt="$t('rockstar-page.ondemand-button-alt-text')"
                src="@/assets/images/icon-fastforward.svg"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- MODAL START -->
  <Modal
      v-show="modalIsOpened"
      @close="CloseModal">
    <template v-slot:header>{{ $t('rockstar-page.modal.header') }}</template>
    <template v-slot:body>New Body</template>
    <template v-slot:footer>
      <button
          class="btn-modal-yellow"
          type="button"
          @click="CloseModal">
        {{ $t('rockstar-page.modal.footer.cancel-button-text') }}
      </button>
    </template>
  </Modal>
  <!-- MODAL END   -->
</template>

<script lang="ts">
import {RockstarShape} from "@/models/Rockstar";
import {ref} from "vue";
import Modal from "@/components/modal/Modal.vue";

export default {
  name: "RockstarView",
  props: {
    rockstar: Object as () => RockstarShape,
  },
  components: {
    Modal
  },

  setup() {
    const modalIsOpened = ref(false);

    const OpenModal = () => {
      modalIsOpened.value = true;
    }

    const CloseModal = () => {
      modalIsOpened.value = false;
    }

    return {
      modalIsOpened,
      OpenModal,
      CloseModal,
    }
  },
};
</script>

<style
    lang="scss"
    scoped
    src="@/styles/pageStyles/RockstarInformationPage/RockstarView.scss"
/>
