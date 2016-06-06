# Authentication with Instagram in Angular-Meteor applications

Allow users to login with their Instagram account in an Angular-Meteor application.

## Features
* Explicit OAuth authentication with Instagram
* Creation of a Meteor user in the database with their Instagram profile information
* Instagram data service to retrieve latest user's media

## Screenshots
#### Login page
![alt text](https://cloud.githubusercontent.com/assets/3925905/15115205/de82be8a-15cb-11e6-8d9c-acee044bdc86.png "Login page")

#### User home page
![alt text](https://cloud.githubusercontent.com/assets/3925905/15115204/de7d2ff6-15cb-11e6-87c7-7a2173337096.png "User home")

## Console output
`console.log( Meteor.user() )`
![alt text](https://cloud.githubusercontent.com/assets/3925905/15115507/45c68fc6-15cd-11e6-838a-2fa14e36bd67.png "Console when logging Meteor.user()")

## Installation
* Install Meteor `curl https://install.meteor.com/ | sh`
* `git clone git@github.com:loic-d/meteor-ng-instagram-auth.git`
* `cd meteor-ng-instagram-auth`
* `meteor npm install`
* Update `clientID` and `secret` with your informations in `/settings.json`
* `meteor --settings settings.json`
* Go to `http://localhost:3000/`

## TO DO
* Intercept error responses from Instagram API
* Avoid $timeout when using Meteor.user() in Angular userHome component
