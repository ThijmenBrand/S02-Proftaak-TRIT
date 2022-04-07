import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
    locale: process.env.VUE_APP_I18N_LOCALE || 'nl',
    fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
    messages: loadLocaleMessages(),
})

// On change of language, switch the /locals/_language_.json file
function loadLocaleMessages() {
    // get all locale json files
    const locales = require.context(
        "./locales",
        true,
        /[A-Za-z0-9-_,\s]+\.json$/i
    );
    const messages: {[index: string]:any} = {};
    locales.keys().forEach((key) => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i);
        if (matched && matched.length > 1) {
            const locale = matched[1];
            messages[locale] = locales(key);
        }
    });
    return messages;
}

createApp(App).use(store).use(router).use(i18n).mount("#app");
