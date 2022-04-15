<template>
  <div class="container">
    <div class="logo">
      <router-link to="/">
        <img
          src="@/assets/logo.svg"
          class="shadow logo-style st0 st1 st5"
          id="rs-logo"
          :alt="$t('rockstars-logo')"
        />
      </router-link>
    </div>
    <div class="hamburger-menu" :class="{ opened: isOpened }">
      <input id="menu-toggle" type="checkbox" @click="CheckIfOpened($event)" />
      <label class="menu-btn" for="menu-toggle">
        <span></span>
      </label>

      <div class="menu-box">
        <div class="menu-item">
          <router-link class="menu-item" to="/" @click="CloseTab">
            {{ $t("menu.home") }}
          </router-link>
        </div>
        <div class="menu-item">
          <router-link class="menu-item" to="/tribes" @click="CloseTab">
            {{ $t("menu.tribes") }}
          </router-link>
        </div>
        <div class="menu-item">
          <router-link class="menu-item" to="/explore" @click="CloseTab">
            {{ $t("menu.explore") }}
          </router-link>
        </div>
        <div class="menu-item">
          <router-link v-if="!IsAuthenticated" to="/account" class="menu-item" @click="showPopup">
            {{ $t("menu.login") }}
          </router-link>
          <router-link v-else class="menu-item" to="/account" @click="CloseTab">
            {{ $t("menu.account") }}
          </router-link>
        </div>

        <LocaleSelector />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import LocaleSelector from "@/components/localeSelector/LocaleSelector.vue";
import { useIsAuthenticated, useMsal } from '@/services/msal/msal';
import { loginRequest } from '@/config/authConfig';

export default {
  components: { LocaleSelector },
  setup() {
    const isOpened = ref(false);

    const CheckIfOpened = (event: any) => {
      isOpened.value = event.target.checked;
    };

    const CloseTab = () => {
      let menuToggle: any = document.getElementById("menu-toggle");
      isOpened.value = false;
      menuToggle.checked = false;
    };

          const { instance } = useMsal();

      const showPopup = () => {
        instance.loginPopup(loginRequest).then(result => console.log(result.account));
      }

      const logoutPopup = () => {
        instance.logoutPopup({
          mainWindowRedirectUri: "/"
        });
      }

      const IsAuthenticated = useIsAuthenticated();

    return {
      isOpened,
      CheckIfOpened,
      CloseTab,
      showPopup,
      logoutPopup,
      IsAuthenticated
    };
  },
};
</script>

<style lang="scss" scoped />
