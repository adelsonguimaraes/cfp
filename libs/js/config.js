(function () {

	"use strict"

	var config = function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, IdleProvider, KeepaliveProvider) {
		$urlRouterProvider.otherwise("/login");

		$ocLazyLoadProvider.config({
	        // Set to true if you want to see what and when is dynamically loaded
	        debug: false
	    });

    	$stateProvider

	        .state('login', {
	            url: "/login",
	            templateUrl: "views/login.html",
	            controller: "loginCtrl",
	            data: { pageTitle: 'Login', specialClass: 'gray-bg'},
	        })
	        .state('home', {
	            url: "/home",
	            templateUrl: "views/home.html",
	            // controller: "loginCtrl",
	            data: { pageTitle: 'Login', specialClass: 'gray-bg'},
	        });
	}

	angular
	    .module('cfp')
	    .config(config)
	    .run(function($rootScope, $state) {
	        $rootScope.$state = $state;
	    });

})();