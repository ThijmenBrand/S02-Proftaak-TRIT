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
    <template v-slot:body>
      <form action="#">
        <div class="ondemand-form-container">
          <div class="row-information">
            <div class="col-information">
              <div>{{ $t('rockstar-page.modal.form.name') }}</div>
              <div>{{ $t('rockstar-page.modal.form.email') }}</div>
              <div>{{ $t('rockstar-page.modal.form.date') }}</div>
            </div>
            <div class="col-information-input">
              <input name="name" required type="text">
              <input name="email" required type="email">
              <input name="date" required type="datetime-local">
            </div>
          </div>
          <div class="row-description">
            <div>{{ $t('rockstar-page.modal.form.request') }}</div>
            <div class="row-description-input">
              <textarea maxlength="1000" name="request" required rows="5"></textarea>
            </div>
          </div>
          <div class="row-buttons">
            <button
                class="btn-modal-light-yellow"
                type="button"
                @click="CloseModal">
              {{ $t('rockstar-page.modal.footer.cancel-button-text') }}
            </button>
            <input
                :value="$t('rockstar-page.modal.footer.submit-button-text')"
                class="btn-modal-yellow"
                name="submit-request"
                type="submit">
          </div>
        </div>
      </form>
    </template>
    <template v-slot:footer>

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
