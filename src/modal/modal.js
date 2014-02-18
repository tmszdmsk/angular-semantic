'use strict';
(function() {

// Declare app level module which depends on filters, and services
   angular.module('ui.semantic.modal', [])
           .service('$modal', ['$controller', '$compile', '$rootScope', function($controller, $compile, $rootScope) {
                   return function(options) {
                       var templateScope = (options.scope || $rootScope.$new());
                       if (options.controller) {
                           $controller(options.controller, {$scope: templateScope});
                       }
                       var modalComponent = $compile(options.template)(templateScope);
                       return {
                           modal: function() {
                               return modalComponent.modal.apply(modalComponent, arguments);
                           },
                           remove: function() {
                               modalComponent.remove();
                               templateScope.$destroy();
                           }
                       };
                   }
                   ;
               }]);
})();
