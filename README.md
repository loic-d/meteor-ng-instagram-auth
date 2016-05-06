# Authentication with Instagram using Meteor and AngularJS

Allows users to login with their Instagram account in a Angular-Meteor application.

* Work in progress... *

Flow:
1. The user enters his Instagram credentials
2. Instagram returns a unique code for the authentication request
3. Meteor retrieves an access token using this code
4. The returned access token is stored in session storage
5. A new user is created in the DB with the Instagram user informations and the access token
6. The user is logged in and redirected to the home page

* This application also provides a data service to retrieve the recent medias of the logged in user *

Installation
* If you don't already have Meteor, install it `curl https://install.meteor.com/ | sh`
* `git@github.com:loic-d/meteor-ng-instagram-auth.git`
* `cd meteor-ng-instagram-auth`
* `meteor npm install`
* Update `clientID` and `secret` with your informations in `/settings.json`
* `meteor --settings settings.json`
* Go to `http://localhost:3000/`
