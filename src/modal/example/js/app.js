'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['ui.semantic.modal'])
        .controller('sampleCtrl', ['$scope', '$modal', function($scope, $modal) {
                var modal;
                $scope.modalOpen = function() {
                    if (angular.isDefined(modal)) {
                        modal.remove();
                    }
                    modal = $modal({template: '<h1>Hello {{world}}</h1>', controller: 'modalController', attrs: {'class': 'ui basic modal'}});
                    modal.modal('setting', 'onHide', function() {
                        console.log("hide param");
                    }).modal('show');
                };
            }])
        .controller('modalController', ['$scope', '$timeout', function($scope, $timeout) {
                $scope.world = 'Ela';
                $timeout(function() {
                    $scope.world = "Żela";
                }, 1000);
            }]);