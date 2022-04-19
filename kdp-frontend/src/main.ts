import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import SetLocalStorage from "@/config/SetLocalstorage";
import { createI18n, I18nOptions } from "vue-i18n";

import VueCookieAcceptDecline from "vue-cookie-accept-decline/src/vue-cookie-accept-decline.vue"

import nl from "@/locales/nl.json";
import en from "@/locales/en.json";
import { msalInstance } from "./config/authConfig";
import { msalPlugin } from "./services/msal/msalPlugin";

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

store.commit("SET_COOKIE_ACCEPTED", window.localStorage.getItem("vue-cookie-accept-decline-cookie-banner") == "accept")

const app = createApp(App);

app.component('vue-cookie-accept-decline', VueCookieAcceptDecline);

app
  .use(store)
  .use(router)
  .use(i18n)
  .use(msalPlugin, msalInstance)
  .mount("#app");
