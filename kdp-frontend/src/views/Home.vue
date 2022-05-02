<template>
  <div class="home">
    <button @click="getAPI()">getAPI</button>
  </div>
</template>

<script lang="ts">
import sendGraphReq from "@/services/graph/graph";
import * as Cookie from "tiny-cookie";
import { AccountInfo, AuthenticationResult } from "@azure/msal-browser";
import { getCurrentUser } from "@/services/msal/msal";
import LocalStorageHandler from "@/services/localStorageHelper/LocalStorageHelper";
export default {
  setup() {
    const getAPI = () => {
      console.log("test");
    };

    return { getAPI };
  },
};
</script>
