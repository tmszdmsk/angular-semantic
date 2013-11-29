'use strict';
(function() {

// Declare app level module which depends on filters, and services
    angular.module('ui.semantic.modal', [])
            .provider('$modal', function() {
                this.$get = ['$controller', '$compile', '$rootScope', '$log', '$q', '$timeout', function($controller, $compile, $rootScope, $log, $q, $timeout) {
                        return function(options) {
                            var modalScope = (options.scope || $rootScope.$new());
                            var templateScope;
                            if (options.controller) {
                                templateScope = modalScope.$new();
                                $controller(options.controller, {$scope: templateScope});
                            } else {
                                templateScope = modalScope;
                            }

                            var templateDefer = $q.defer();
                            if (options.template) {
                                templateDefer.resolve(options.template);
                            } else if (options.templateUrl) {
                                $timeout(function() {
                                    templateDefer.resolve('<h1>some template from url, world: {{world}}</h1>')
                                }, 1000);
                            }

                            var modalComponent = $('<div class="ui modal"></div>');
                            if (options.attrs) {
                                for (var key in options.attrs) {
                                    var value = options.attrs[key];
                                    modalComponent.attr(key, value);
                                }
                            }
                            modalComponent = $compile(modalComponent)(modalScope);

                            templateDefer.promise.then(function(template) {
                                modalComponent.append($compile(template)(templateScope));
                            });
                            return {
                                modal: function() {
                                    return modalComponent.modal.apply(modalComponent, arguments);
                                },
                                remove: function() {
                                    modalComponent.remove();
                                    modalScope.$destroy();
                                }
                            };
                        };
                    }];
            });
})();