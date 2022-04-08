<template>
  <div class="container">
    <div class="logo">
      <router-link to="/">
        <img
          src="@/assets/logo.svg"
          class="shadow logo-style st0 st1 st5"
          id="rs-logo"
        />
      </router-link>
    </div>
    <div class="hamburger-menu" :class="{ opened: isOpened }">
      <input id="menu-toggle" type="checkbox" @click="CheckIfOpened($event)" />
      <label class="menu-btn" for="menu-toggle">
        <span></span>
      </label>

      <ul class="menu-box">
        <li>
          <router-link class="menu-item" to="/" @click="CloseTab">
            {{ $t('menu.home') }}
          </router-link>
        </li>
        <li>
          <router-link class="menu-item" to="/tribes" @click="CloseTab">
            {{ $t('menu.tribes') }}
          </router-link>
        </li>
        <li>
          <router-link class="menu-item" to="/explore" @click="CloseTab">
            {{ $t("menu.explore") }}
          </router-link>
        </li>
        <li>
          <a class="menu-item" href="#" @click="CloseTab">
            {{ $t('menu.vision') }}
          </a>
        </li>
        <li>
          <a class="menu-item" href="#" @click="CloseTab">
            {{ $t('menu.possibilities') }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
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

    return {
      isOpened,
      CheckIfOpened,
      CloseTab,
    };
  },
};
</script>

<style lang="scss" scoped />
