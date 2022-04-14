import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import SetLocalStorage from "@/config/SetLocalstorage";
import { createI18n, I18nOptions } from "vue-i18n";

import nl from "@/locales/nl.json";
import en from "@/locales/en.json";

type MessageSchema = typeof nl;

SetLocalStorage();

const i18n = createI18n<I18nOptions, [MessageSchema], "nl" | "en">({
  legacy: false,
  globalInjection: true,
  locale: "nl",
  fallbackLocale: "en",
  messages: {
    nl: nl,
    en: en,
  },
});

createApp(App).use(store).use(router).use(i18n).mount("#app");
