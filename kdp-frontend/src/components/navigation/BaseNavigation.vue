<template>
  <div class="container">
    <div class="logo">
      <router-link to="/">
        <img src="@/assets/logo.png" alt="RockstarsIT Logo" />
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

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.container {
  background-color: $trit-yellow;
  width: 100%;
  height: 12em;
}

.logo {
  margin: 0;
  padding: 0;
}

.logo img {
  height: calc(12em - (20px / 2));
  filter: drop-shadow(2px 2px 2px gray);
}

/* hamburger menu */
#menu-toggle {
  opacity: 0;
}
#menu-toggle:checked + .menu-btn > span {
  transform: rotate(45deg);
}
#menu-toggle:checked + .menu-btn > span::before {
  top: 0;
  transform: rotate(0deg);
  background-color: #ffffff;
}
#menu-toggle:checked + .menu-btn > span::after {
  top: 0;
  transform: rotate(90deg);
  background-color: #ffffff;
}
#menu-toggle:checked ~ .menu-box {
  right: 0 !important;
}
.menu-btn {
  position: fixed;
  top: 40px;
  right: 40px;
  width: 26px;
  cursor: pointer;
  z-index: 1;
}
.menu-btn > span,
.menu-btn > span::before,
.menu-btn > span::after {
  display: block;
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #616161;
  text-decoration: none;
  transition-duration: 0.25s;
}
.menu-btn > span::before {
  content: "@@";
  color: transparent;
  top: -8px;
}
.menu-btn > span::after {
  content: "";
  top: 8px;
}
.menu-box {
  display: block;
  position: fixed;
  top: 0;
  right: -100%;
  width: 300px;
  height: 100%;
  margin: 0;
  padding: 80px 0;
  list-style: none;
  background-color: $trit-gray;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
  transition-duration: 0.25s;
}
.menu-item {
  display: block;
  padding: 12px 24px;
  color: #ffffff;
  font-family: "Roboto", sans-serif;
  font-size: 20px;
  font-weight: 600;
  text-decoration: none;
  transition-duration: 0.25s;
}
.menu-item:hover {
  transition: color 0.25s ease-in;
  color: $trit-yellow;
}
</style>