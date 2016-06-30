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

	/*******************************************
			Controller de Login
	*******************************************/
	var login = function ($scope, $rootScope, $location, authenticationAPI) {
		
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

	/*******************************************
			Controller de Home
	*******************************************/
	var home = function ($scope) {
		console.log('eu sou a home');
	}

	/*******************************************
			Controller de Despesa
	*******************************************/
	var despesa = function ($scope, $rootScope, genericAPI) {
		
		function inciaScope () {
			$scope.despesa = {
				"id":"",
				"descricao":"",
				"valor":"",
				"quantidade":1,
				"prestacoes":1,
				"dataaquisicao": moment().format('DD/MM/YYYY'),
				"datavencimento": moment().format('DD/MM/YYYY')
			}
			$scope.nova = false;
		}
		inciaScope();

		$scope.novaDespesa = function () {
			$scope.nova = true;
		}

		$scope.listar = function () {
			var data = {
				"metodo":"listar",
				"class":"despesa"
			};
			genericAPI.generic(data)
				.then(function successCallback(response) {
					if(response.data.length>0){
			        	$scope.despesas = response.data;
			        }
		        }, function errorCallback(response) {
		        	//error
				});	

		}
		$scope.listar();

		$scope.editar = function (obj) {
			obj.dataaquisicao = moment(obj.dataaquisicao).format('DD/MM/YYYY');
			obj.datavencimento = moment(obj.datavencimento).format('DD/MM/YYYY');
			obj.quantidade = parseInt(obj.quantidade);
			obj.prestacoes = parseInt(obj.prestacoes);
			$scope.despesa = obj;
			$scope.novaDespesa();
		}

		$scope.salvar = function (obj) {
			
			obj.idusuario = $rootScope.usuario.idusuario;
			
			var metodo = "cadastrar";
			if(obj.id) metodo = "atualizar";
			
			obj.dataaquisicao = obj.dataaquisicao.substr(6)+'-'+obj.dataaquisicao.substr(3,2)+'-'+obj.dataaquisicao.substr(0,2);
			obj.datavencimento = obj.datavencimento.substr(6)+'-'+obj.datavencimento.substr(3,2)+'-'+obj.datavencimento.substr(0,2);

			var data = {
				"metodo":metodo,
				"data":obj,
				"class":"despesa"
			};
			genericAPI.generic(data)
				.then(function successCallback(response) {
					//se o sucesso === true
					if(response.data.success == true){
		                //criamos a session
		            	
		            }else{
		                //ativamos o login error com true
		            	
		            }
		        }, function errorCallback(response) {
		        	//error
				});	

			inciaScope();
			$scope.listar();
		}

		$scope.cancelar = function () {
			inciaScope();
		}
	}

	/*******************************************
			Controller de Recebimento
	*******************************************/
	var recebimento = function ($scope, $rootScope) {
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
		.controller('mainCtrl', main)
		.controller('loginCtrl', login)
		.controller('homeCtrl', home)
		.controller('despesaCtrl', despesa)
		.controller('recebimentoCtrl', recebimento);

})();