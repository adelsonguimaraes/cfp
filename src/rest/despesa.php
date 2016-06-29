<?php
// rest : despesa

/*
	Projeto: CFP - Controle Financeiro Pessoal.
	Project Owner: Adelson Guimarães Monteiro.
	Desenvolvedor: Adelson Guimarães Monteiro.
	Data de início: 20/06/2016.
	Data Atual: 29/06/2016.
*/

//inclui autoload
require_once 'autoload.php';

//verifica requisição
switch ($_POST['metodo']) {
	case 'cadastrar':
		cadastrar();
		break;
	case 'buscarPorId':
		buscarPorId();
		break;
	case 'listar':
		listar();
		break;
	case 'atualizar':
		atualizar();
		break;
	case 'deletar':
		deletar();
		break;
}

function cadastrar () {
	$data = $_POST['data'];
	$obj = new Despesa(
		NULL,
		new Usuario($data['idusuario']),
		$data['descricao'],
		$data['valor'],
		$data['quantidade'],
		$data['prestacoes'],
		$data['dataaquisicao'],
		$data['datavencimento'],
		$data['ativo']
	);
	$control = new DespesaControl($obj);
	$id = $control->cadastrar();
	echo $id;
}
function buscarPorId () {
	$data = $_POST['data'];
	$control = new DespesaControl(new Despesa($data['id']));
	$obj = $control->buscarPorId();
	if(!empty($obj)) {
		echo json_encode($obj);
	}
}
function listar () {
	$control = new DespesaControl(new Despesa);
	$lista = $control->listar();
	if(!empty($lista)) {
		echo json_encode($lista);
	}
}
function atualizar () {
	$data = $_POST['data'];
	$obj = new Despesa(
		$data['id'],
		new Usuario($data['idusuario']),
		$data['descricao'],
		$data['valor'],
		$data['quantidade'],
		$data['prestacoes'],
		$data['dataaquisicao'],
		$data['datavencimento'],
		$data['ativo']
	);
	$control = new DespesaControl($obj);
	$id = $control->atualizar();
	echo $id;
}
function deletar () {
	$data = $_POST['data'];
	$banco = new Despesa();
	$banco->setId($data['id']);
	$control = new DespesaControl($banco);
	echo $control->deletar();
}


// Classe gerada com BlackCoffeePHP 1.0 - by Adelson Guimarães
?>