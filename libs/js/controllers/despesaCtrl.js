/*******************************************
		Controller de Despesa
*******************************************/
var despesaCtrl = function ($scope, $rootScope, $location, genericAPI) {

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

angular
	.module('cfp')
	.controller('despesaCtrl', despesaCtrl);