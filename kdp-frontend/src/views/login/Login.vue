<template>
  <h1 v-if="IsAuthenticated">Welkom!</h1>
  <button v-if="IsAuthenticated" @click="logoutPopup()">signout</button>
  <p v-for="(account, index) in accountInfo" :key="index">{{account.name}}</p>
</template>

<script lang="ts">
import { getAccountInfo, useIsAuthenticated, useMsal } from '@/services/msal/msal';
import { loginRequest } from "@/config/authConfig";
import { AccountInfo } from '@azure/msal-common';
import { computed } from '@vue/runtime-core';
export default {
    name: "Login",
    setup() {
      const { instance } = useMsal();

      const showPopup = () => {
        instance.loginPopup(loginRequest);
      }

      const logoutPopup = () => {
        instance.logoutPopup({
          mainWindowRedirectUri: "/"
        });
      }

      const IsAuthenticated = useIsAuthenticated();

      const accountInfo = computed((): AccountInfo[] => getAccountInfo());

      console.log(accountInfo.value[0]);

      return {showPopup, IsAuthenticated,logoutPopup, accountInfo}
    }
}
</script>

<style lang="scss" scoped src="@/styles/pageStyles/login/login.scss" />