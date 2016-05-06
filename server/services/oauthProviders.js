const services = Meteor.settings.private.oAuth;

const configureOAuthProviders = () => {
    if ( services ) {
        for( let service in services ) {
            ServiceConfiguration.configurations.upsert( { service: service }, {
                $set: services[ service ]
            });
        }
    }
};

Modules.server.configureOAuthProviders = configureOAuthProviders;