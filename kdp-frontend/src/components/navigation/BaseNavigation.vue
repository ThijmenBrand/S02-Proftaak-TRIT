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
  </div>
  <div class="hamburger-menu">
    <input id="menu-toggle" type="checkbox" />
    <label class="menu-btn" for="menu-toggle">
      <span></span>
    </label>

    <ul class="menu-box">
      <li>
        <router-link class="menu-item" to="/">HOME</router-link>
      </li>
      <li>
        <router-link class="menu-item" to="/tribes">TRIBES</router-link>
      </li>
      <li><a class="menu-item" href="#">OUR ASPIRATIONS</a></li>
      <li><a class="menu-item" href="#">OUR VISION</a></li>
      <li><a class="menu-item" href="#">YOUR POSSIBILITIES</a></li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  components: {},
};
</script>

<style src="@/styles/navigation/navigation.scss" lang="scss" scoped />
