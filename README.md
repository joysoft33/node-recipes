# node-recipes
Minimal node/express DOM sample (Livecoding) evoluting to a light AngularJS application.
Each step is referenced by its own tag.

Run the following command to see all tags:
```
git tag -n
```

The following command will create a new branch based on the given tag name:
```
git checkout tags/<tag_name> -b <branch_name>
```

Tags:
- **v1.00**: a minimal node/express server, and a front that dynamically insert data to an HTML page via basic navigator JS libraries
- **v1.01**: sequelize ORM
- **v1.02**: sequelize associations (categories)
- **v1.03**: basic nodemailer with mails ejs templates
- **v1.04**: migrate the front to AngularJS, recipes list
- **v1.05**: recipe details, AngularJS messages
- **v1.06**: recipe add
- **v1.07**: recipe delete
- **v1.08**: recipe categories and new directories organization
- **v1.09**: english/french localization
- **v1.10**: use vendor files installed via npm instead of public/vendors directory
- **v1.11**: eslint added
- **v1.12**: localization namespaces
- **v1.13**: images upload, new global config module
- **v1.14**: angular-ui-router
- **v1.15**: angular-resource
- **v1.16**: angular-ui-router parent/children views
- **v1.17**: server side JWT authentication + first tests for users routes
- **v1.18**: launching server directly from test module
- **v1.19**: front side authentication
- **v1.20**: use cookie to save language preference
