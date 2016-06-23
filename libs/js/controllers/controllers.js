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
				"dataaquisicao": moment().format('DD/MM/YYYY'),
				"datavencimento": moment().format('DD/MM/YYYY')
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

	var recebimento = function ($scope) {
		function startScope () {
			$scope.recebimento = {
				"id":"",
				"descricao":"",
				"valor":"",
				"dataarrecadacao":moment().format('DD/MM/YYYY'),
				"tipo":"UNICO",
				"ativo":"sim"
			}
			$scope.novo = false;
		}
		startScope();

		$scope.novoRecebimento = function () {
			$scope.novo = true;
		}

		$scope.salvar = function (obj) {
			console.log(obj);
		}

		$scope.cancelar = function () {
			startScope();
		}
	}

	angular
		.module('cfp')
		.controller('loginCtrl', login)
		.controller('homeCtrl', home)
		.controller('despesaCtrl', despesa)
		.controller('recebimentoCtrl', recebimento);

})();