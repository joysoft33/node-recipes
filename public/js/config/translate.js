export default translateConfig;

/**
 * The language translation configuration
 * @param {*} $translateProvider
 */
function translateConfig($translateProvider) {
  'ngInject';

  $translateProvider

    .translations('en', {
      BUTTON: {
        ADD: 'Add',
        DELETE: 'Delete',
        SAVE: 'Save',
        CANCEL: 'Cancel',
        RETURN: 'Return',
        VALIDATE: 'Validate'
      },
      NAVBAR: {
        TITLE: 'Recipes',
        LANGUAGE: 'Language',
        ENGLISH: 'English',
        FRENCH: 'French',
        LOGOUT: 'Logout',
        LOGIN: 'Login',
        SIGNUP: 'Signup',
        USERS: 'Users',
        HELLO: 'Hello'
      },
      RECIPE_ADD: {
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
      LOGIN: {
        TITLE: 'You must identify yourself',
        NAME: 'Name',
        EMAIL: 'Mail address',
        PASSWORD: 'Password',
        CREATE: 'Create my account'
      },
      USERS: {
        NAME: 'Name',
        EMAIL: 'Email',
        DATE: 'Date',
        ADMIN: 'Admin'
      },
      ALL: 'All'
    })

    .translations('fr', {
      BUTTON: {
        ADD: 'Ajouter',
        DELETE: 'Effacer',
        SAVE: 'Sauver',
        CANCEL: 'Annuler',
        RETURN: 'Retour',
        VALIDATE: 'Valider'
      },
      NAVBAR: {
        TITLE: 'Recettes',
        LANGUAGE: 'Langage',
        ENGLISH: 'Anglais',
        FRENCH: 'Français',
        LOGOUT: 'Déconnexion',
        LOGIN: 'Connexion',
        SIGNUP: 'Enregistrement',
        USERS: 'Utilisateurs',
        HELLO: 'Bonjour'
      },
      RECIPE_ADD: {
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
      LOGIN: {
        TITLE: 'Vous devez vous identifier',
        NAME: 'Nom',
        EMAIL: 'Adresse mail',
        PASSWORD: 'Mot de passe',
        CREATE: 'Créer mon compte'
      },
      USERS: {
        NAME: 'Nom',
        EMAIL: 'Mail',
        DATE: 'Date',
        ADMIN: 'Admin'
      },
      ALL: 'Toutes'
    })

    .useSanitizeValueStrategy('escape')
    .preferredLanguage('fr')
    .fallbackLanguage('fr');
}