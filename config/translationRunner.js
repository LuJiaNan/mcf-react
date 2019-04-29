// import manageTranslations from 'react-intl-translations-manager';
const manageTranslations = require('react-intl-translations-manager').default;

manageTranslations({
  translationsDirectory: './locales/src/',
  messagesDirectory: './locales',
  languages: ['en-US','zh-CN','zh-CHT'] // any language you need
});
