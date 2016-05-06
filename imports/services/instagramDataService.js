import angular from 'angular';
import angularMeteor from 'angular-meteor';

const name = 'instagramDataServiceModule';

export default angular.module(name, [
    angularMeteor,
    ]).factory('instagramDataService', ['$http', function($http) {

        var token = sessionStorage.getItem('ig-token');

        return {
            getRecentUserMedias: function(callback){
                const endpoint = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + token + '&callback=JSON_CALLBACK';
                $http.jsonp(endpoint).success(function(response){
                    callback(response.data);
                });
            }
        }

    }]);
