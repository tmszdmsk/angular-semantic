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
                            $controller(options.controller, {$scope: templateScope})
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
                        templateDefer.promise.then(function(template) {
                            modalComponent.append($compile(template)(templateScope));
                        });
                        if (options.attrs) {
                            for (var key in options.attrs) {
                                var value = options.attrs[key];
                                modalComponent.attr(key, value);
                            }

                        }
                        var onHideWrap = function(callback) {
                            return function() {
                                if (callback) {
                                    callback.apply(this, arguments);
                                }
                                modalScope.$destroy();
                                //how to wait till the end of animation??
                                modalComponent.remove();
                            };
                        };
                        modalComponent.modal('setting', 'onHide', onHideWrap())
                        return {
                            modal: function(argument1, argument2, argument3) {
                                if (argument1 === 'setting' && argument2 === 'onHide' && argument3) {
                                    argument3 = onHideWrap(argument3);
                                }
                                return modalComponent.modal(argument1, argument2, argument3);
                            }
                        };
                    };
                }];
        });
})();