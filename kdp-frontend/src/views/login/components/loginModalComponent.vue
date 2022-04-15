<template>
  <div class="login-container">
      <BaseButton :btnContent="$t('login.login-button')" color="black" class="login-button" @click="$emit('loginPopup')" />
  </div>
</template>

<script lang="ts">
import BaseButton from "@/components/buttons/BaseButton.vue";
export default {
    name: "loginModal",
    components: {BaseButton},
    
}
</script>
