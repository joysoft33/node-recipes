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
        EXIT: 'Exit'
      },
      USERS: {
        NAME: 'Name',
        EMAIL: 'Email',
        DATE: 'Date',
        ADMIN: 'Admin',
        RECIPES: 'Recipes'
      },
      USER_DETAILS: {
        NAME: 'Name',
        EMAIL: 'Mail address',
        PASSWORD: 'Password',
        ADMIN: 'Administrator'
      },
      LOGIN: {
        TITLE: 'You must identify yourself',
        NAME: 'Name',
        EMAIL: 'Mail address',
        PASSWORD: 'Password',
        CREATE: 'Create my account'
      },
      ERRORS: {
        MESSAGE: 'Message',
        STATUS: 'Status',
        RETURN: 'Return to home page'
      }
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
        EXIT: 'Quitter'
      },
      USERS: {
        NAME: 'Nom',
        EMAIL: 'Mail',
        DATE: 'Date',
        ADMIN: 'Admin',
        RECIPES: 'Recettes'
      },
      USER_DETAILS: {
        NAME: 'Nom',
        EMAIL: 'Adresse mail',
        PASSWORD: 'Mot de passe',
        ADMIN: 'Administrateur'
      },
      LOGIN: {
        TITLE: 'Vous devez vous identifier',
        NAME: 'Nom',
        EMAIL: 'Adresse mail',
        PASSWORD: 'Mot de passe',
        CREATE: 'Créer mon compte'
      },
      ERRORS: {
        MESSAGE: 'Message',
        STATUS: 'Statut',
        RETURN: 'Retour à l\'accueil'
      }
    })

    .useSanitizeValueStrategy('escape')
    .preferredLanguage('fr')
    .fallbackLanguage('fr');
}