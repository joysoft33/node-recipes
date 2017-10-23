'use strict';

angular.module('recipesApp')

  .config(($translateProvider) => {

    $translateProvider

      .translations('en', {
        BUTTON: {
          ADD: 'Add',
          DELETE: 'Delete',
          SAVE: 'Save',
          CANCEL: 'Cancel'
        },
        NAVBAR: {
          TITLE: 'Recipes',
          LANGUAGE: 'Language',
          ENGLISH: 'English',
          FRENCH: 'French',
        },
        VIEW_ADD: {
          TITLE: 'Title',
          DESCRIPTION: 'Description',
          IMAGE: 'Image',
          COUNT: 'Person count',
          CATEGORY: 'Category'
        }
      })

      .translations('fr', {
        BUTTON: {
          ADD: 'Ajouter',
          DELETE: 'Effacer',
          SAVE: 'Sauver',
          CANCEL: 'Annuler'
        },
        NAVBAR: {
          TITLE: 'Recettes',
          LANGUAGE: 'Langage',
          ENGLISH: 'Anglais',
          FRENCH: 'Français'
        },
        VIEW_ADD: {
          TITLE: 'Titre',
          DESCRIPTION: 'Description',
          IMAGE: 'Image',
          COUNT: 'Nombre de personnes',
          CATEGORY: 'Categorie'
        }
      })

      .useSanitizeValueStrategy('escape')
      .preferredLanguage('fr');
  });