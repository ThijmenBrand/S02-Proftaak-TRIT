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
    <div class="hamburger-menu" :class="{opened : isOpened}">
      <input id="menu-toggle" type="checkbox" @click="CheckIfOpened($event)"/>
      <label class="menu-btn" for="menu-toggle">
        <span></span>
      </label>

      <ul class="menu-box">
        <li>
          <router-link class="menu-item" to="/" @click="CloseTab">HOME</router-link>
        </li>
        <li>
          <router-link class="menu-item" to="/tribes" @click="CloseTab">TRIBES</router-link>
        </li>
        <li>
          <router-link class="menu-item" to="/explore" @click="CloseTab">EXPLORE</router-link>
        </li>
        <li><a class="menu-item" href="#" @click="CloseTab">OUR VISION</a></li>
        <li><a class="menu-item" href="#" @click="CloseTab">YOUR POSSIBILITIES</a></li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, ref} from "vue";

export default {
  setup() {
    const isOpened = ref(false);

    const CheckIfOpened = (event: any) => {
      isOpened.value = event.target.checked;
    }

    const CloseTab = () => {
      let menuToggle: any = document.getElementById("menu-toggle");
      menuToggle.checked = false;
    }

    return {
      isOpened, 
      CheckIfOpened,
      CloseTab,
    }
  }
};


</script>

<style src="@/styles/navigation/navigation.scss" lang="scss" scoped/>
