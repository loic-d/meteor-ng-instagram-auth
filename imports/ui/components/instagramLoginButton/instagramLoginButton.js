import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './instagramLoginButton.html';

class InstagramLoginButton {

    constructor($window) {
        'ngInject';
        this.clientID = Meteor.settings.public.oAuth.instagram.clientID;
        this.redirectURI = Meteor.settings.public.oAuth.instagram.redirectURI;
        this._$window = $window;
    }

    redirectToAuthorization() {

        const IG_AUTH_URL = `https://api.instagram.com/oauth/authorize/?`
            + `client_id=${this.clientID}`
            + `&redirect_uri=${this.redirectURI}`
            + `&response_type=code`
            + `&scope=follower_list+basic`;

        this._$window.location = IG_AUTH_URL;
    }

}

const name = 'instagramLoginButton';

export default angular.module(name, [
        angularMeteor
    ])
    .component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
        controllerAs: name,
        controller: InstagramLoginButton
    });
