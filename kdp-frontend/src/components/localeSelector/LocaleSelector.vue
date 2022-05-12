<template>
  <div class="locale-change-container">
    <div class="locale-container-title">
      <i>{{ $t("menu.change-language-prompt") }}</i>
    </div>
    <div class="locale-container">
      <!--<select v-model="$i18n.locale">
        <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale }}</option>
      </select>-->
      <!-- The commented snippet is for a simple dropdown-->
      <div
        class="locale-single"
        v-for="locale in $i18n.availableLocales.reverse()"
        :key="`locale-${locale}`"
      >
        <input
          type="radio"
          :id="locale"
          v-model="$i18n.locale"
          :value="locale"
          @click="saveLanguage(locale)"
        />
        <label :for="locale">
          <img
            :src="require('@/assets/flags/' + locale + '.svg')"
            :alt="$t('menu.change-language-prompt.flags.generic')"
          />
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import * as Cookies from 'tiny-cookie'

export default {
  name: "LocaleSelector",
  setup() {
    const saveLanguage = (local: string) => {
      if (localStorage.getItem("vue-cookie-accept-decline-cookie-banner") == "accept") {
        Cookies.setCookie("lang", local)
      }
    };
    return {
      saveLanguage
    };
  }
};
</script>

<style lang="sass" scoped>
@import "@/styles/componentStyles/localeSelector/localeSelector.scss"
</style>