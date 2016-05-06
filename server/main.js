import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

    Modules.server.configureOAuthProviders();

});