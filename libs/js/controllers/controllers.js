//controllers

(function () {
	
	"use strict"

	var login = function ($scope, $location, authenticationAPI) {
		
		$scope.logar = function (obj) {
			var data = {
				"metodo":"logar",
				"data":obj
			};
			authenticationAPI.authentication(data)
				.then(function successCallback(response) {
		            //se o sucesso === true
					if(response.data.success == true){
		                //criamos a session
		            	authenticationAPI.createSession(response.data.data, obj.infinity);
		                //logion error é escondido
		                $scope.login.error = false;
		                //redirecionamos para home
		                $location.path('/home');
		            }else{
		                //ativamos o login error com true
		            	$scope.login.error = true;
		            }
		        }, function errorCallback(response) {
		        	//error
				});	
		}
	}

	var home = function ($scope) {
		console.log('eu sou a home');
	}

	var despesa = function ($scope) {
		
		function inciaScope () {
			$scope.despesa = {
				"id":"",
				"descricao":"",
				"valor":"",
				"quantidade":1,
				"prestacao":1,
				"dataaquisicao":"",
				"diavencimento":1,
			}
			$scope.nova = false;
		}
		inciaScope();

		$scope.novaDespesa = function () {
			$scope.nova = true;
		}

		$scope.salvar = function (obj) {
			console.log(obj);
			inciaScope();
		}

		$scope.cancelar = function () {
			inciaScope();
		}
	}

	angular
		.module('cfp')
		.controller('loginCtrl', login)
		.controller('homeCtrl', home)
		.controller('despesaCtrl', despesa);

})();