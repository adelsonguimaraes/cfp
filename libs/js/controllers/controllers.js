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

		//verifica sessao
		if($rootScope.usuario) {
			$location.path('/home');
			return false;
		}
		
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
	var home = function ($scope, $rootScope, $location, genericAPI) {

		//verifica sessao
		if(!$rootScope.usuario) {
			$location.path('/login');
			return false;
		}

		var meses = [
			{"nome":"Janeiro",	"sigla":"JAN"},
			{"nome":"Fevereiro",	"sigla":"FEV"},
			{"nome":"Março", 		"sigla":"MAR"},
			{"nome":"Abril", 		"sigla":"ABRIL"},
			{"nome":"Maio",	 	"sigla":"MAIO"},
			{"nome":"Junho", 		"sigla":"JUN"},
			{"nome":"Julho", 		"sigla":"JUL"},
			{"nome":"Agosto", 	"sigla":"AGOS"},
			{"nome":"Setembro", 	"sigla":"SET"},
			{"nome":"Outubro", 	"sigla":"OUT"},
			{"nome":"Novembro", 	"sigla":"NOV"},
			{"nome":"Dezembro", 	"sigla":"DEZ"}
		];

		$scope.meses = [];

		function carregaMeses () {
			var now = new Date();
			var count = now.getMonth();
			var total = count + 8;
			while (count < 12) {
				$scope.meses.push(meses[count]);
				count++;
			}
			var resto = total - count;
			count = 0;
			while (count < resto) {
				$scope.meses.push(meses[count]);
				count++;
			}
		}
		carregaMeses ();

		$scope.despesas = [
			{"descricao":"Tênis", "valor":"90", "prestacoes":"5", "datavencimento":"05/07/2016"},
			{"descricao":"Carro", "valor":"450", "prestacoes":"25", "datavencimento":"01/07/2016"},
			{"descricao":"Bolsa", "valor":"70", "prestacoes":"0", "datavencimento":"08/07/2016"},
			{"descricao":"Oculos", "valor":"180", "prestacoes":"2", "datavencimento":"20/07/2016"},
			{"descricao":"Notebook", "valor":"2000", "prestacoes":"10", "datavencimento":"15/07/2016"}
		];

		$scope.totais = [{"valor":0}, {"valor":0}, {"valor":0}, {"valor":0}, {"valor":0}, {"valor":0}, {"valor":0}, {"valor":0}];
		$scope.totalgeral = 0;

		for (var x in $scope.despesas) {
			var qtdpres = $scope.despesas[x].prestacoes;
			var count = 0;
			$scope.despesas[x].pres = [];

			// console.log($scope.despesas[x].datavencimento.substr(0,2));

			for (var z=0; z<8; z++) {
				if (count <= qtdpres) {
					$scope.despesas[x].pres.push({"valor":$scope.despesas[x].valor});
					$scope.totais[z].valor = $scope.totais[z].valor +  parseInt($scope.despesas[x].valor);
					if($scope.totais[z-1] != undefined && $scope.totais[z].valor < $scope.totais[z-1].valor) {
						$scope.totais[z].icon = "fa-arrow-down";
					}else if($scope.totais[z-1] != undefined && $scope.totais[z].valor > $scope.totais[z-1].valor) {
						$scope.totais[z].icon = "fa-arrow-up";
					}
				}else{
					$scope.despesas[x].pres.push({"valor":"xxxx"});
				}
				count++;
			}
			$scope.totalgeral = $scope.totalgeral + parseFloat($scope.despesas[x].valor);
		}
	}

	/*******************************************
			Controller de Despesa
	*******************************************/
	var despesa = function ($scope, $rootScope, $location, genericAPI) {

		//verifica sessao
		if(!$rootScope.usuario) {
			$location.path('/login');
			return false;
		}
		
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
					//success
					inciaScope();
					$scope.listar();
		        }, function errorCallback(response) {
		        	//error
				});	
		}

		$scope.deletar = function (obj) {
			
			var data = {
				"metodo":"deletar",
				"data":obj,
				"class":"despesa"
			};
			genericAPI.generic(data)
				.then(function successCallback(response) {
					//success
					inciaScope();
					$scope.listar();
		        }, function errorCallback(response) {
		        	//error
				});	
		}

		$scope.cancelar = function () {
			inciaScope();
		}
	}

	/*******************************************
			Controller de Recebimento
	*******************************************/
	var recebimento = function ($scope, $rootScope, $location, genericAPI) {
		
		//verifica sessao
		if(!$rootScope.usuario) {
			$location.path('/login');
			return false;
		}

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

		$scope.listar = function () {
			var data = {
				"metodo":"listar",
				"class":"recebimento"
			};
			genericAPI.generic(data)
				.then(function successCallback(response) {
					if(response.data.length>0){
			        	$scope.recebimentos = response.data;
			        }
		        }, function errorCallback(response) {
		        	//error
				});	

		}
		$scope.listar();

		$scope.editar = function (obj) {
			obj.dataarrecadacao = moment(obj.dataarrecadacao).format('DD/MM/YYYY');
			$scope.recebimento = obj;
			$scope.novoRecebimento();
		}

		$scope.salvar = function (obj) {
			
			obj.idusuario = $rootScope.usuario.idusuario;
			
			var metodo = "cadastrar";
			if(obj.id) metodo = "atualizar";

			obj.dataarrecadacao = obj.dataarrecadacao.substr(6)+'-'+obj.dataarrecadacao.substr(3,2)+'-'+obj.dataarrecadacao.substr(0,2);
			
			var data = {
				"metodo":metodo,
				"data":obj,
				"class":"recebimento"
			};
			genericAPI.generic(data)
				.then(function successCallback(response) {
					//success
					startScope();
					$scope.listar();
		        }, function errorCallback(response) {
		        	//error
				});	
		}

		$scope.deletar = function (obj) {
			
			var data = {
				"metodo":"deletar",
				"data":obj,
				"class":"recebimento"
			};
			genericAPI.generic(data)
				.then(function successCallback(response) {
					//success
					startScope();
					$scope.listar();
		        }, function errorCallback(response) {
		        	//error
				});	
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