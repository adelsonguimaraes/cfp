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
			{"nome":"Agosto", 	"sigla":"AGO"},
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
			{"descricao":"Tênis", "valor":"90", "prestacoes":"5", "datavencimento":"2016-07-05"},
			{"descricao":"Mouse Razor", "valor":"150", "prestacoes":"3", "datavencimento":"2016-07-05"},
			{"descricao":"Carro", "valor":"450", "prestacoes":"25", "datavencimento":"2016-07-01"},
			{"descricao":"Bolsa", "valor":"70", "prestacoes":"1", "datavencimento":"2016-07-08"},
			{"descricao":"Oculos", "valor":"180", "prestacoes":"2", "datavencimento":"2016-07-20"},
			{"descricao":"Notebook", "valor":"2000", "prestacoes":"10", "datavencimento":"2016-07-15"},
			{"descricao":"Meia", "valor":"2000", "prestacoes":"7", "datavencimento":"2016-09-15"}
		];

		$scope.totais = [{"valor":0}, {"valor":0}, {"valor":0}, {"valor":0}, {"valor":0}, {"valor":0}, {"valor":0}, {"valor":0}];
		$scope.totalgeral = 0;

		function ordenaDatas (despesas) {
			var datas = despesas;
			var array = [];
			while (datas.length > 0) {
				var num = {"datavencimento":"9999/12/31"};
				var pos = 0;
				for (var x in datas) {
					if (moment(datas[x].datavencimento)._d.getTime() < moment(num.datavencimento)._d.getTime()) {
						num = datas[x];
						num.diavencimento = num.datavencimento.substr(8,2);
						pos = x;
					}
				}
				array.push(num);
				datas.splice( pos, 1 );
			}
			$scope.despesas = array;
		}
		ordenaDatas ($scope.despesas);

		// contruindo tabelas de mes

		for (var x in $scope.despesas) {
			var despesa = $scope.despesas[x];
			despesa.pres = [];

			for (var m=0; m<8; m++) {
				var day = moment().add(m, "M").date();
				var month = moment().add(m, "M").month();
				var year = moment().add(m, "M").year();
				var teste = '';
				var data = '';

				for (var p=0; p<despesa.prestacoes; p++) {
					var dia = moment(despesa.datavencimento).add(p, "M").date();
					var mes = moment(despesa.datavencimento).add(p, "M").month();
					var ano = moment(despesa.datavencimento).add(p, "M").year();
					
					if (mes === month && ano === year) {
						data = {"data": mes+"/"+ano, "valor":despesa.valor};
					}
				}
				if ( data === '' ) {
					despesa.pres.push({"data": "00/0000", "valor":"xxxx", "color":"background:#f0f5f5; color:#ccc;"});
				}else{
					despesa.pres.push(data);
					$scope.totais[m].valor = $scope.totais[m].valor +  parseInt(despesa.valor);
					
					if($scope.totais[m-1] != undefined && $scope.totais[m].valor < $scope.totais[m-1].valor) {
						$scope.totais[m].icon = "fa-arrow-down";
					}else if($scope.totais[m-1] != undefined && $scope.totais[m].valor > $scope.totais[m-1].valor) {
						$scope.totais[m].icon = "fa-arrow-up";
					}else{
						$scope.totais[m].icon = "fa-arrow-right";
					}
				}
			}

			$scope.totalgeral = $scope.totalgeral + parseFloat(despesa.valor);
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