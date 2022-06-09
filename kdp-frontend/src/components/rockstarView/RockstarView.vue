<template>
  <div class="rockstar-pane">
    <div class="rockstar-card">
      <div class="col-image">
        <img
          :alt="
            $t('rockstar-page.profile-picture-alt-text', {
              name: rockstar.displayName,
            })
          "
          :src="`data:image/png;base64,${rockstar.image}`"
          class="rockstar-profile-image"
        />
      </div>
      <div class="col-information">
        <div class="row-name">
          <a class="DIN2014-Bold">{{ rockstar.displayName }}</a>
        </div>
        <div class="col-socials">
          <a
            v-if="rockstar.twitter != null"
            :href="rockstar.twitter"
            class="social-component"
          >
            <img
              :alt="$t('rockstar-page.socials.twitter-icon-alt-text')"
              class="social-image"
              src="@/assets/images/socials/twitter.svg"
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

        <div v-if="FormSucces">
            <p class="email-succes">OnDemand request succesfully send!</p>
        </div>

        <div id="open-ondemand-modal" class="row-ondemand" @click="OpenModal">
          <div class="col-ondemand-text">
            {{ $t("rockstar-page.ondemand-button-text") }}
          </div>
          <div class="col-ondemand-icon">
            <img
              :alt="$t('rockstar-page.ondemand-button-alt-text')"
              src="@/assets/images/icon-fastforward.svg"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <Modal v-show="modalIsOpened" @close="CloseModal">
    <template v-slot:header>{{ $t("rockstar-page.modal.header") }}</template>
    <template v-slot:body>
      <form>
        <div class="ondemand-form-container">
          <div class="row-information">
            <div class="col-information">
              <div>{{ $t("rockstar-page.modal.form.name") }}</div>
              <small v-if="!formValidation.nameValid" class="validation"
                >&nbsp;</small
              >
              <div>{{ $t("rockstar-page.modal.form.email") }}</div>
              <small v-if="!formValidation.emailValid" class="validation"
                >&nbsp;</small
              >
              <div>{{ $t("rockstar-page.modal.form.date") }}</div>
              <small v-if="!formValidation.dateValid" class="validation"
                >&nbsp;</small
              >
            </div>
            <div class="col-information-input">
              <input v-model="onDemandRequest.name" name="name" type="text" />
              <small v-if="!formValidation.nameValid" class="validation">{{
                $t("rockstar-page.modal.form.name-validation")
              }}</small>
              <input
                v-model="onDemandRequest.email"
                name="email"
                type="email"
              />
              <small v-if="!formValidation.emailValid" class="validation">{{
                $t("rockstar-page.modal.form.email-validation")
              }}</small>
              <input
                v-model="onDemandRequest.date"
                name="date"
                type="datetime-local"
              />
              <small v-if="!formValidation.dateValid" class="validation">{{
                $t("rockstar-page.modal.form.date-validation")
              }}</small>
            </div>
          </div>
          <div class="row-description">
            <div>{{ $t("rockstar-page.modal.form.request") }}</div>
            <div class="row-description-input">
              <textarea
                v-model="onDemandRequest.description"
                maxlength="1000"
                name="request"
                rows="5"
              ></textarea>
            </div>
            <small v-if="!formValidation.descriptionValid" class="validation">{{
              $t("rockstar-page.modal.form.request-validation")
            }}</small>
            <small class="character-counter"
              >{{ onDemandRequest.description.length }}/1000</small
            >

            <div v-if="FormFailed">
              <p>Request failed</p>
            </div>

          </div>
          <div class="row-buttons">
            <button
              class="btn-modal-light-yellow"
              type="button"
              @click="CloseModal"
            >
              {{ $t("rockstar-page.modal.footer.cancel-button-text") }}
            </button>
            <input
              :value="$t('rockstar-page.modal.footer.submit-button-text')"
              class="btn-modal-yellow"
              name="submit-request"
              type="button"
              @click="OnFormSubmit"
            />
          </div>
        </div>
      </form>
    </template>
    <template v-slot:footer> </template>
  </Modal>
</template>

<script lang="ts">
import { RockstarShape } from "@/models/Rockstar";
import { reactive, ref } from "vue";
import Modal from "@/components/modal/Modal.vue";
import rockstarService from "@/services/callFunctions/rockstar";
import  RockstarOnDemandRequest from "@/models/RockstarOnDemandRequest";
import rockstar from '@/views/rockstar/store/rockstars';

export default {
  name: "RockstarView",
  props: {
    rockstar: Object as () => RockstarShape,
  },
  components: {
    Modal,
  },
  setup(props: any) {
    const modalIsOpened = ref<boolean>(false);
    const FormFailed = ref<boolean>(false);
    const FormSucces = ref<boolean>(false);

    const OpenModal = (): void => {
      modalIsOpened.value = true;
      FormSucces.value = false;
    };
    const CloseModal = (): void => {
      modalIsOpened.value = false;
      formValidation.nameValid = true;
      formValidation.emailValid = true;
      formValidation.dateValid = true;
      formValidation.descriptionValid = true;
    };
    const onDemandRequest = reactive({
      name: "",
      email: "",
      date: new Date(0),
      description: "",
    });
    const formValidation = reactive({
      nameValid: true,
      emailValid: true,
      dateValid: true,
      descriptionValid: true,
    });
    const OnFormSubmit = async () => {

      FormFailed.value = false;

      onDemandRequest.name == ""
        ? (formValidation.nameValid = false)
        : (formValidation.nameValid = true);
      const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      emailRegex.test(onDemandRequest.email)
        ? (formValidation.emailValid = true)
        : (formValidation.emailValid = false);
      onDemandRequest.date < new Date()
        ? (formValidation.dateValid = false)
        : (formValidation.dateValid = true);
      onDemandRequest.description == ""
        ? (formValidation.descriptionValid = false)
        : (formValidation.descriptionValid = true);
      if (
        formValidation.nameValid &&
        formValidation.emailValid &&
        formValidation.dateValid &&
        formValidation.descriptionValid
      ) {

        const { data, status } = await rockstarService.SendOnDemandRequest( {
          receiverEmail: props.rockstar.email,
          senderEmail: onDemandRequest.email,
          name: onDemandRequest.name,
          message: onDemandRequest.description,
          date: onDemandRequest.date.toString()} );

        if (status >= 200 && status <= 299) {
          CloseModal();
          FormSucces.value = true;
          setInterval(function () {FormSucces.value = false;}, 4000);
        }
        else {
          FormFailed.value = true;
        }

        
      }

    };
    return {
      modalIsOpened,
      OpenModal,
      CloseModal,
      onDemandRequest,
      formValidation,
      OnFormSubmit,
      FormFailed,
      FormSucces,
    };
  },
};
</script>

<style
  lang="scss"
  scoped
  src="@/styles/pageStyles/RockstarInformationPage/RockstarView.scss"
/>
