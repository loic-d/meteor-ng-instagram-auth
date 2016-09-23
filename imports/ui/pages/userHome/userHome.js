import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import './userHome.html';
import { name as instagramDataServiceModule } from '../../../services/instagramDataService';

class UserHome {

    constructor($scope, $reactive, $location, $timeout, instagramDataService) {
        'ngInject';
        $reactive(this).attach($scope);

        if(!this.userLoggedIn()){
           $location.path('/');
        }

        this.user = {};
        this._$timeout = $timeout;
        this._$location = $location;
        this.userMedia = {};

        instagramDataService.getRecentUserMedias((media) => {
            this.userMedia = media;
        });

        this.getLoggedInUser();
    }

    getLoggedInUser() {
      //TODO
      // Find a better way to retrieve current logged in user.
      this._$timeout(() => {
        this.user = Meteor.user();
      }, 1000);
    }

    userLoggedIn() {
      return sessionStorage.getItem('ig-token') !== null ? true : false;
    }

    logout() {
      sessionStorage.removeItem('ig-token');
      Meteor.logout();
      this._$location.path('/');
    }

}

const name = 'userHome';

export default angular.module(name, [
        angularMeteor,
        uiRouter,
        instagramDataServiceModule
    ])
    .component(name, {
        templateUrl: `imports/ui/pages/${name}/${name}.html`,
        controllerAs: name,
        controller: UserHome
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('userHome', {
            url: '/home',
            template: '<user-home></user-home>'
        });
}
