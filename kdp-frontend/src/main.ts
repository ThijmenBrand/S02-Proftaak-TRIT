import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { createI18n, I18nOptions } from "vue-i18n";
import nl from "@/locales/nl.json";
import en from "@/locales/en.json";
import { msalInstance } from "./config/authConfig";
import { msalPlugin } from "./services/msal/msalPlugin";
import * as Cookies from "tiny-cookie";
import LocalStorageHandler from "./services/localStorageHelper/LocalStorageHelper";
import CookieShape from "./models/Cookie";
import getToken from "./services/msal/getApplicationToken";

type MessageSchema = typeof nl;

console.log(getToken());

const cookies: CookieShape = LocalStorageHandler.getItem("cookieAccepted");
const AcceptedFunctionalCookies =
  cookies == null ? false : cookies.AcceptedFunctionalCookies;

store.commit("SET_COOKIE_ACCEPTED", cookies);

const i18n = createI18n<I18nOptions, [MessageSchema], "nl" | "en">({
  legacy: false,
  globalInjection: true,
  locale:
    cookies?.AcceptedAllCookies || AcceptedFunctionalCookies
      ? Cookies.getCookie("lang") || "en"
      : "en",
  fallbackLocale: "en",
  messages: {
    nl: nl,
    en: en,
  },
});

const app = createApp(App);

app
  .use(store)
  .use(router)
  .use(i18n)
  .use(msalPlugin, msalInstance)
  .mount("#app");
