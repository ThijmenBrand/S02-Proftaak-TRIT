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
      <form>
        <div class="ondemand-form-container">
          <div class="row-information">
            <div class="col-information">
              <div>{{ $t('rockstar-page.modal.form.name') }}</div>
              <small v-if="!formValidation.nameValid" class="validation">&nbsp;</small>
              <div>{{ $t('rockstar-page.modal.form.email') }}</div>
              <small v-if="!formValidation.emailValid" class="validation">&nbsp;</small>
              <div>{{ $t('rockstar-page.modal.form.date') }}</div>
              <small v-if="!formValidation.dateValid" class="validation">&nbsp;</small>
            </div>
            <div class="col-information-input">
              <input v-model="onDemandRequest.name" name="name" type="text">
              <small v-if="!formValidation.nameValid" class="validation">Please enter a username.</small>
              <input v-model="onDemandRequest.email" name="email" type="email">
              <small v-if="!formValidation.emailValid" class="validation">Please enter a valid email.</small>
              <input v-model="onDemandRequest.date" name="date" type="datetime-local">
              <small v-if="!formValidation.dateValid" class="validation">Please enter a valid date.</small>
            </div>
          </div>
          <div class="row-description">
            <div>{{ $t('rockstar-page.modal.form.request') }}</div>
            <div class="row-description-input">
              <textarea v-model="onDemandRequest.description" maxlength="1000" name="request"
                        rows="5"></textarea>
            </div>
            <small v-if="!formValidation.descriptionValid" class="validation">Please enter a request.</small>
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
                type="button"
                @click="OnFormSubmit">
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
import {reactive, ref} from "vue";
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

    const onDemandRequest = reactive({
      name: "",
      email: "",
      date: new Date(0),
      description: ""
    });

    const formValidation = reactive({
      nameValid: true,
      emailValid: true,
      dateValid: true,
      descriptionValid: true,
    });

    const OnFormSubmit = () => {
      onDemandRequest.name == "" ?
          formValidation.nameValid = false :
          formValidation.nameValid = true;

      const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      emailRegex.test(onDemandRequest.email) ?
          formValidation.emailValid = true :
          formValidation.emailValid = false;

      onDemandRequest.date < new Date() ?
          formValidation.dateValid = false :
          formValidation.dateValid = true;

      onDemandRequest.description == "" ?
          formValidation.descriptionValid = false :
          formValidation.descriptionValid = true;

      if (formValidation.nameValid &&
          formValidation.emailValid &&
          formValidation.dateValid &&
          formValidation.descriptionValid) {
        //window.location.href = "https://www.google.com";
      }
    }


    return {
      modalIsOpened,
      OpenModal,
      CloseModal,
      onDemandRequest,
      formValidation,
      OnFormSubmit,
    }
  },
};
</script>

<style
    lang="scss"
    scoped
    src="@/styles/pageStyles/RockstarInformationPage/RockstarView.scss"
/>
