import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';

import './app.html';
import { name as Home } from '../../pages/home/home';
import { name as UserHome } from '../../pages/userHome/userHome';
import { name as Oauth } from '../../pages/oauth/oauth';

class App {}

const name = 'app';

export default angular.module(name, [
    angularMeteor,
    uiRouter,
    ngMaterial,
    Home,
    UserHome,
    Oauth
    ]).component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
        controllerAs: name,
        controller: App
    })
    .config(config);

function config($locationProvider, $mdThemingProvider) {
    'ngInject';
    $locationProvider.html5Mode(true);
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('blue');
}
