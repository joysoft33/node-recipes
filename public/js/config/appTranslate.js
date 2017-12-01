import deepMerge from 'deepmerge';

import translations from './common/translate';

export default (specific) => {

  const translate = deepMerge(translations, specific);

  /**
   * The internationalization configuration
   * @param {*} $translateProvider
   */
  function translationConfig($translateProvider) {
    'ngInject';

    for (const key in translate) {
      if (translate.hasOwnProperty(key)) {
        $translateProvider.translations(key, translate[key]);
      }
    }

    $translateProvider
      .useSanitizeValueStrategy('escape')
      .preferredLanguage('fr')
      .fallbackLanguage('fr');
  }

  return translationConfig;
};