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
        <div class="menu-items"> 

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
          <a v-if="!IsAuthenticated" class="menu-item" @click="login">
            {{ $t("menu.login") }}
          </a>
          <a v-else class="menu-item" @click="logout">
            {{ $t("menu.logout") }}
          </a>
        </div>
        </div>
        <div class="menu-options"> 
          <LocaleSelector />
          <p class="reset-cookies" @click="$emit('open-cookie-selector')">Reset cookies</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useStore} from "vuex";
import { useIsAuthenticated, useMsal } from '@/services/msal/msal';
import { loginRequest } from '@/config/authConfig';

import LocaleSelector from "@/components/localeSelector/LocaleSelector.vue";

import LocalStorageHandler from "@/services/localStorageHelper/LocalStorageHelper"

export default {
  components: { LocaleSelector },
  setup() {
    const store = useStore();
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

    const login = () => {
      instance.loginPopup(loginRequest).then(result => {
        LocalStorageHandler.setItem('user', result); 
        CloseTab()
        });
    }

    const logout = () => {
      localStorage.removeItem('user');
      instance.logoutPopup({
        mainWindowRedirectUri: "/"
      });
    }

    const IsAuthenticated = useIsAuthenticated();

    return {
      isOpened,
      CheckIfOpened,
      CloseTab,
      login,
      IsAuthenticated,
      logout
    };
  },
};
</script>

<style lang="scss" scoped />
