'use strict';

angular.module('recipesApp')

  .config($translateProvider => {

    $translateProvider

      .translations('en', {
        BTN_ADD: 'Add',
        BTN_DELETE: 'Delete',
        BTN_SAVE: 'Save',
        BTN_CANCEL: 'Cancel',
        
        NAVBAR_TITLE: 'Recipes',
        NAVBAR_LANGUAGE: 'Language',
        NAVBAR_ENGLISH: 'English',
        NAVBAR_FRENCH: 'French',

        ADD_TITLE: 'Title',
        ADD_DESCRIPTION: 'Description',
        ADD_IMAGE: 'Image',
        ADD_COUNT: 'Person count',
        ADD_CATEGORY: 'Category'
      })
    
      .translations('fr', {
        BTN_ADD: 'Ajouter',
        BTN_DELETE: 'Effacer',
        BTN_SAVE: 'Sauver',
        BTN_CANCEL: 'Annuler',

        NAVBAR_TITLE: 'Recettes',
        NAVBAR_LANGUAGE: 'Langage',
        NAVBAR_ENGLISH: 'Anglais',
        NAVBAR_FRENCH: 'Français',

        ADD_TITLE: 'Titre',
        ADD_DESCRIPTION: 'Description',
        ADD_IMAGE: 'Image',
        ADD_COUNT: 'Nombre de personnes',
        ADD_CATEGORY: 'Categorie'
      })
    
      .useSanitizeValueStrategy('escape')
      .preferredLanguage('fr');
  });