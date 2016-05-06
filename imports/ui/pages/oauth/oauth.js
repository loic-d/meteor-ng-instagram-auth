import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import './oauth.html';

class Oauth {

    constructor($location, $stateParams, $scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this._$location = $location;
        this._$scope = $scope;
        this.code = $stateParams.code;
        this.requestInstagramAccessToken();
    }

    requestInstagramAccessToken() {

        this.call('requestInstagramAccessToken', this.code, (error, user) => {
            if(user){
                this.createOrUpdateUser(user);
                this.setUserToken(user.access_token);
            }
            else if(error){
              console.log('Error requesting Instagram Access Token ', error);
            }
        });

    }

    createOrUpdateUser(user) {

        this.call('createOrUpdateUser', user, (error, meteorUser) => {
            if(meteorUser){
                // console.log(meteorUser); => {type: "instagram", userId: "smk5qGQp7SwExiKk9"}
                this.setUserId(meteorUser.userId);
                this.loginUser(meteorUser);
            }
            else if(error){
              console.log('Error creating or updating the user ', error);
            }
        })

    }

    loginUser(meteorUser) {

      this.call('loginUser', meteorUser, (error, token) => {
        if(token){
          Meteor.loginWithToken(token);
          this._$location.path('/home');
          this._$location.search('code', null);
          this._$scope.$apply();
        }
        else if(error){
          console.log('Error when logging the user in', error);
        }
      })

    }


    setUserToken(token) {
        sessionStorage.setItem('ig-token', token);
    }

    setUserId(id) {
      sessionStorage.setItem('userId', id);
    }

}

const name = 'oauth';

export default angular.module(name, [
    angularMeteor,
    uiRouter
]).component(name, {
    templateUrl: `imports/ui/pages/${name}/${name}.html`,
    controllerAs: name,
    controller: Oauth
})
.config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('oauth', {
            url: '/_oauth?code',
            template: '<oauth></oauth>'
        });
}
