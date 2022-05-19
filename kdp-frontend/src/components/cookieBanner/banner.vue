<template>
  <div class="learn-more-modal" v-if="showLearnMoreModal">
    <div class="learn-more-modal-content">
      <div class="learn-more-modal-header-container" >
        <h1 class="learn-more-modal-header">{{ $t("cookie-message.learn-more.header") }}</h1>
        <button class="learn-more-modal-button" @click="openLearnMore()">+</button>
      </div>
      <p>
        {{ $t("cookie-message.learn-more.info") }}
      </p>
      <div class="learn-more-choises">
        <div class="cookie-option">

          <label class="checkbox-container"> {{ $t("cookie-message.learn-more.options.allcookies") }}
            <input type="checkbox" id="checkbox" v-model="allCookies" />
            <span class="checkmark"></span>
          </label>
        </div>

        <div class="spacer"/>

        <div class="cookie-option">
          <label class="checkbox-container">{{ $t("cookie-message.learn-more.options.Analyticalcookies") }}
            <input type="checkbox" id="checkbox" v-model="analyticalCookies" />
            <span class="checkmark"></span>
          </label>
        </div>
        <div class="cookie-option">
          <label class="checkbox-container">{{ $t("cookie-message.learn-more.options.Functionalcookies") }}
            <input type="checkbox" id="checkbox" v-model="functionalCookies" />
            <span class="checkmark"></span>
          </label>
        </div>
        <button class="save-cookie-options" @click="savePreferences()">
          {{ $t("cookie-message.learn-more.save") }}
        </button>
      </div>
    </div>
  </div>
  <div class="cookie-banner-container">
    <div class="Cookie-banner-content-container">
      <p>
        {{ $t("cookie-message") }} -
        <span class="cookie-banner-learn-more" @click="openLearnMore()">{{
          $t("cookie-message.learn-more")
        }}</span>
      </p>
      <div>
        <button class="decline" @click="declineCookies()">
          {{ $t("cookie-message.decline") }}
        </button>
        <button class="accept" @click="acceptCookies()">
          {{ $t("cookie-message.accept") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";
export default {
  name: "cookieBanner",
  setup() {
    const store = useStore();
    const showLearnMoreModal = ref<boolean>(false);
    const analyticalCookies = ref<boolean>(true);
    const functionalCookies = ref<boolean>(true);
    const allCookies = computed({
      get() {
        return analyticalCookies.value && functionalCookies.value;
      },
      set(value: boolean) {
        analyticalCookies.value = value;
        functionalCookies.value = value;
      },
    });
    const noCookies = computed({
      get() {
        return !(analyticalCookies.value || functionalCookies.value);
      },
      set() {
        analyticalCookies.value = false;
        functionalCookies.value = false;
      },
    });
    const savePreferences = () => {
      store.commit("SET_COOKIE_ACCEPTED", {
        ShowCookieBanner: false,
        AcceptedAllCookies: allCookies.value,
        AcceptedAnalyticalCookies: analyticalCookies.value,
        AcceptedFunctionalCookies: functionalCookies.value,
      });
    };
    function acceptCookies() {
      store.commit("SET_COOKIE_ACCEPTED", {
        ShowCookieBanner: false,
        AcceptedAllCookies: true,
      });
    }
    function declineCookies() {
      store.commit("SET_COOKIE_ACCEPTED", {
        ShowCookieBanner: false,
        AcceptedAllCookies: false,
      });
    }

    const openLearnMore = () => {
      showLearnMoreModal.value = !showLearnMoreModal.value;
    };

    return {
      acceptCookies,
      declineCookies,
      showLearnMoreModal,
      openLearnMore,
      analyticalCookies,
      functionalCookies,
      allCookies,
      noCookies,
      savePreferences,
    };
  },
};
</script>

<style lang="scss" scoped src="@/styles/componentStyles/cookie/cookie.scss"/>