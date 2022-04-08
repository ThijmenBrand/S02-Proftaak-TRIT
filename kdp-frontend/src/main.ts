import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { createI18n } from "vue-i18n";
import { I18nHelper } from "@/i18nHelper";

const i18n = createI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || "nl",
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
  messages: I18nHelper.loadLocaleMessages(),
});

createApp(App).use(store).use(router).use(i18n).mount("#app");
