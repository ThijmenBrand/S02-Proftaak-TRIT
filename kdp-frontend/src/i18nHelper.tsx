export abstract class I18nHelper {
  // On change of language, switch the /locals/_language_.json file
  public static loadLocaleMessages(): { [index: string]: any } {
    // get all locale json files
    const locales = require.context(
      "./locales",
      true,
      /[A-Za-z0-9-_,\s]+\.json$/i
    );

    const messages: { [index: string]: any } = {};
    locales.keys().forEach((key) => {
      const matched = key.match(/([A-Za-z0-9-_]+)\./i);
      if (matched && matched.length > 1) {
        const locale = matched[1];
        messages[locale] = locales(key);
      }
    });

    return messages;
  }
}
