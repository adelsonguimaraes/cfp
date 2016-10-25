/*******************************************
		Controller de Home
*******************************************/
var homeCtrl = function ($scope, $rootScope, $location, genericAPI) {

	//verifica sessao
	if(!$rootScope.usuario) {
		$location.path('/login');
		return false;
	}

	var meses = [
		{"nome":"Janeiro",	"sigla":"JAN", "ano":"0000"},
		{"nome":"Fevereiro",	"sigla":"FEV", "ano":"0000"},
		{"nome":"Março", 		"sigla":"MAR", "ano":"0000"},
		{"nome":"Abril", 		"sigla":"ABRIL", "ano":"0000"},
		{"nome":"Maio",	 	"sigla":"MAIO", "ano":"0000"},
		{"nome":"Junho", 		"sigla":"JUN", "ano":"0000"},
		{"nome":"Julho", 		"sigla":"JUL", "ano":"0000"},
		{"nome":"Agosto", 	"sigla":"AGO", "ano":"0000"},
		{"nome":"Setembro", 	"sigla":"SET", "ano":"0000"},
		{"nome":"Outubro", 	"sigla":"OUT", "ano":"0000"},
		{"nome":"Novembro", 	"sigla":"NOV", "ano":"0000"},
		{"nome":"Dezembro", 	"sigla":"DEZ", "ano":"0000"}
	];

	$scope.meses = [];

	function carregaMeses () {
		var now = new Date();
		var count = now.getMonth();
		var total = count + 8;
		var ano = moment().year();

		while (count < 12) {
			meses[count].ano = ano;
			$scope.meses.push(meses[count]);
			count++;
		}
		var resto = total - count;
		count = 0;
		while (count < resto) {
			meses[count].ano = ano+1;
			$scope.meses.push(meses[count]);
			count++;
		}
	}
	carregaMeses ();

	$scope.despesas = [];

	$scope.listarDespessas = function () {
		var data = {
			"metodo":"listar",
			"class":"despesa"
		};
		genericAPI.generic(data)
			.then(function successCallback(response) {
				if(response.data.length>0){
					$scope.despesas = response.data;
		        	ordenaDatas ($scope.despesas);
		        }
	        }, function errorCallback(response) {
	        	//error
			});	

	}
	$scope.listarDespessas();

	// $scope.despesas = [
	// 	{"descricao":"Tênis", "valor":"90", "prestacoes":"5", "datavencimento":"2016-07-05"},
	// 	{"descricao":"Mouse Razor", "valor":"150", "prestacoes":"3", "datavencimento":"2016-07-05"},
	// 	{"descricao":"Carro", "valor":"450", "prestacoes":"25", "datavencimento":"2016-07-01"},
	// 	{"descricao":"Bolsa", "valor":"70", "prestacoes":"1", "datavencimento":"2016-07-08"},
	// 	{"descricao":"Oculos", "valor":"180", "prestacoes":"2", "datavencimento":"2016-07-20"},
	// 	{"descricao":"Notebook", "valor":"2000", "prestacoes":"10", "datavencimento":"2016-07-15"},
	// 	{"descricao":"Meia", "valor":"500", "prestacoes":"7", "datavencimento":"2016-09-15"}
	// ];

	$scope.totais = [{"valor":0}, {"valor":0}, {"valor":0}, {"valor":0}, {"valor":0}, {"valor":0}, {"valor":0}, {"valor":0}];
	$scope.totalgeral = 0;

	function ordenaDatas (despesas) {
		var datas = despesas;
		var array = [];
		while (datas.length > 0) {
			var num = {"datavencimento":"9999/12/31"};
			var pos = 0;
			for (var x in datas) {
				if (moment(datas[x].datavencimento).date() < moment(num.datavencimento).date()) {
					num = datas[x];
					num.diavencimento = num.datavencimento.substr(8,2);
					pos = x;
				}
			}
			array.push(num);
			datas.splice( pos, 1 );
		}
		$scope.despesas = array;
		montaTimeline();
	}
	// ordenaDatas ($scope.despesas);

	function montaTimeline () {
	// construindo tabelas de mes
		for (var x in $scope.despesas) {
			var despesa = $scope.despesas[x];
			despesa.pres = [];

			for (var m=0; m<8; m++) {
				var day = moment().add(m, "M").date();
				var month = moment().add(m, "M").month();
				var year = moment().add(m, "M").year();
				var data = '';

				for (var p=0; p<despesa.prestacoes; p++) {
					var dia = moment(despesa.datavencimento).add(p, "M").date();
					var mes = moment(despesa.datavencimento).add(p, "M").month();
					var ano = moment(despesa.datavencimento).add(p, "M").year();
					
					if (mes === month && ano === year) {
						data = {"data": mes+"/"+ano, "valor":despesa.valor};
						// pegando a prestação atual
						if (m === 0) {
							despesa.prestacao = (p+1)+"/"+despesa.prestacoes;
						}
					}
				}

				if (!despesa.prestacao) {
					despesa.prestacao = "0/"+despesa.prestacoes;
				}

				if ( data === '' ) {
					despesa.pres.push({"data": "00/0000", "valor":"xxxx", "color":"background:#f0f5f5; color:#ccc;", "icon":"fa-trophyx"});
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
}

angular
	.module('cfp')
	.controller('homeCtrl', homeCtrl);