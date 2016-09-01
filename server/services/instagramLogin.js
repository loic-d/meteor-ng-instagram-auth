Meteor.methods({

    requestInstagramAccessToken: function(code) {

        function buildRequestParams(code, config) {
            return {
                params: {
                    client_id: config.clientID,
                    client_secret: config.secret,
                    grant_type: 'authorization_code',
                    redirect_uri: encodeURI(config.redirectURI),
                    code: code,
                }
            };
        }

        const config = ServiceConfiguration.configurations.findOne({service: 'instagram'});

        const requestObject = buildRequestParams(code, config);
        let response;

        try {
            response = HTTP.post(config.accessTokenURI, requestObject);

            if (response.error) {
                throw response.error;
            }
            if (typeof response.content === "string") {
                response.content = JSON.parse(response.content);
            }
            if (response.content.error) {
                throw response.content;
            }
        } catch(err) {
            throw { error: err };
        }

        return response.content;

    },
    createOrUpdateUser: function(response) {

        const serviceData = {
            id: response.user.id,
            accessToken: response.access_token
        };

        const options = {
            profile: {
                name: response.user.full_name,
                bio: response.user.bio,
                picture: response.user.profile_picture,
                id: response.user.id
            }
        };

        return Accounts.updateOrCreateUserFromExternalService('instagram', serviceData, options);
    },
    loginUser: function(meteorUser) {

      const userId = meteorUser.userId;
      const stampedLoginToken = Accounts._generateStampedLoginToken();

      Accounts._insertLoginToken(userId, stampedLoginToken);

      if(stampedLoginToken.token){
        return stampedLoginToken.token;
      }
      else {
        console.log('Error generating stamped login token');
      }

    }

});
