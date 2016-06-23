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
				"dataaquisicao":"",
				"diavencimento":"",
				"prestacoes":"",
				"itens": []
			}
		}
		inciaScope();

		$scope.addItem = function (obj) {
			var item = {
				"id":obj.id,
				"descricao":obj.descricao,
				"valor":obj.valor,
				"quantidade":obj.quantidade
			}
			$scope.despesa.itens.push(item);
			delete $scope.item;
			console.log($scope.despesa);
		}

		$scope.salvar = function (obj) {
			alert('vc salvou');
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