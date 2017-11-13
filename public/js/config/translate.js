'use strict';

angular.module('recipesApp')

  .config(($translateProvider) => {

    $translateProvider

      .translations('en', {
        BUTTON: {
          DELETE: 'Delete',
          SAVE: 'Save',
          CANCEL: 'Cancel',
          RETURN: 'Return'
        },
        NAVBAR: {
          TITLE: 'Recipes',
          LANGUAGE: 'Language',
          ENGLISH: 'English',
          FRENCH: 'French',
          ADD: 'Add',
          LOGOUT: 'Logout',
          LOGIN: 'Login',
          SIGNUP: 'Signup'
        },
        VIEW_ADD: {
          TITLE: 'Title',
          DESCRIPTION: 'Description',
          IMAGE: 'Image',
          COUNT: 'Person count',
          CATEGORY: 'Category',
          FILESIZE: 'File too large',
          SELECT: 'Select image file',
          DROP: 'or drop it here',
          PREVIEW: 'Preview'
        },
        ALL: 'All'
      })

      .translations('fr', {
        BUTTON: {
          DELETE: 'Effacer',
          SAVE: 'Sauver',
          CANCEL: 'Annuler',
          RETURN: 'Retour'
        },
        NAVBAR: {
          TITLE: 'Recettes',
          LANGUAGE: 'Langage',
          ENGLISH: 'Anglais',
          FRENCH: 'Français',
          ADD: 'Nouvelle recette',
          LOGOUT: 'Déconnexion',
          LOGIN: 'Connexion',
          SIGNUP: 'Enregistrement'
        },
        VIEW_ADD: {
          TITLE: 'Titre',
          DESCRIPTION: 'Description',
          IMAGE: 'Image',
          COUNT: 'Nombre de personnes',
          CATEGORY: 'Categorie',
          FILESIZE: 'Fichier trop lourd',
          SELECT: 'Choisir un fichier',
          DROP: 'ou le déposer ici',
          PREVIEW: 'Aperçu'
        },
        ALL: 'Toutes'
      })

      .useSanitizeValueStrategy('escape')
      .preferredLanguage('fr')
      .fallbackLanguage('fr');
    });