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

      <div class="menu-box">
        <div class="menu-item">
          <router-link class="menu-item" to="/" @click="CloseTab">
            {{ $t('menu.home') }}
          </router-link>
        </div>
        <div class="menu-item">
          <router-link class="menu-item" to="/tribes" @click="CloseTab">
            {{ $t('menu.tribes') }}
          </router-link>
        </div>
        <div class="menu-item">
          <router-link class="menu-item" to="/explore" @click="CloseTab">
            {{ $t("menu.explore") }}
          </router-link>
        </div>
        <div class="menu-item">
          <a class="menu-item" href="#" @click="CloseTab">
            {{ $t('menu.vision') }}
          </a>
        </div>
        <div class="menu-item">
          <a class="menu-item" href="#" @click="CloseTab">
            {{ $t('menu.possibilities') }}
          </a>
        </div>
        <div class="locale-change-container">
          <div class="locale-container-title"><i>{{ $t('menu.change-language-prompt') }}</i></div>
          <div class="locale-container">
            <div class="locale" id="nl">
              <img src="@/assets/flags/nl.svg" alt="{{ $t('menu.change-language-prompt.flags.nl') }}" />
            </div>
            <div class="locale" id="en">
              <img src="@/assets/flags/us.svg" alt="{{ $t('menu.change-language-prompt.flags.usa')  }}" />
            </div>
          </div>
        </div>
      </div>

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
