//controllers

(function () {
	
	"use strict"

	/*******************************************
			Controller Main
	*******************************************/
	var main = function ($location, $rootScope, authenticationAPI) {

	    var root = $rootScope;

	    root.api = "http://api.nuvio.com.br"; //variavel de api global
	    root.usuario = ""; //startando variavel global usuario

	    // authenticationAPI.verificaSessao();
	    authenticationAPI.sessionCtrl();

	}

	angular
		.module('cfp')
		.controller('mainCtrl', main);

})();