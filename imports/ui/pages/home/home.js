import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import './home.html';

import { name as InstagramLoginButton } from '../../components/instagramLoginButton/instagramLoginButton';

class Home {
    constructor($scope, $reactive, $location) {
        'ngInject';
        $reactive(this).attach($scope);

        if(this.userLoggedIn()){
          $location.path('/home');
        }
    }

    userLoggedIn() {
      return sessionStorage.getItem('ig-token') !== null ? true : false;
    }
}

const name = 'home';

export default angular.module(name, [
    angularMeteor,
    uiRouter,
    InstagramLoginButton
    ]).component(name, {
        templateUrl: `imports/ui/pages/${name}/${name}.html`,
        controllerAs: name,
        controller: Home
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('home', {
            url: '/',
            template: '<home></home>'
        });
}
