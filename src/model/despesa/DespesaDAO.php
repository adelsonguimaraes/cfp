<?php
// dao : despesa

/*
	Projeto: CFP - Controle Financeiro Pessoal.
	Project Owner: Adelson Guimarães Monteiro.
	Desenvolvedor: Adelson Guimarães Monteiro.
	Data de início: 20/06/2016.
	Data Atual: 29/06/2016.
*/

Class DespesaDAO {
	//atributos
	private $con;
	private $sql;
	private $obj;
	private $lista = array();

	//construtor
	public function __construct($con) {
		$this->con = $con;
	}

	//cadastrar
	function cadastrar (Despesa $obj) {
		$this->sql = sprintf("INSERT INTO despesa(idusuario, descricao, valor, quantidade, prestacoes, dataaquisicao, datavencimento, ativo)
		VALUES(%d, '%s', %f, %d, %d, '%s', '%s', '%s')",
			mysqli_real_escape_string($this->con, $obj->getObjusuario()->getId()),
			mysqli_real_escape_string($this->con, $obj->getDescricao()),
			mysqli_real_escape_string($this->con, $obj->getValor()),
			mysqli_real_escape_string($this->con, $obj->getQuantidade()),
			mysqli_real_escape_string($this->con, $obj->getPrestacoes()),
			mysqli_real_escape_string($this->con, $obj->getDataaquisicao()),
			mysqli_real_escape_string($this->con, $obj->getDatavencimento()),
			mysqli_real_escape_string($this->con, $obj->getAtivo()));
		if(!mysqli_query($this->con, $this->sql)) {
			die('[ERRO]: Class('.get_class($obj).') | Metodo(Cadastrar) | Erro('.mysqli_error($this->con).')');
		}
		return mysqli_insert_id($this->con);
	}

	//buscarPorId
	function buscarPorId (Despesa $obj) {
		$this->sql = sprintf("SELECT * FROM despesa WHERE id = %d",
			mysqli_real_escape_string($this->con, $obj->getId()));
		$resultSet = mysqli_query($this->con, $this->sql);
		if(!$resultSet) {
			die('[ERRO]: Class('.get_class($obj).') | Metodo(BuscarPorId) | Erro('.mysqli_error($this->con).')');
		}
		while($row = mysqli_fetch_object($resultSet)) {
			//classe usuario
			$controlUsuario = new UsuarioControl(new Usuario($row->idusuario));
			$objUsuario = $controlUsuario->buscarPorId();
			$this->obj = new Despesa($row->id, $objUsuario, $row->descricao, $row->valor, $row->quantidade, $row->prestacoes, $row->dataaquisicao, $row->datavencimento, $row->ativo, $row->datacadastro, $row->dataedicao);
		}
		return $this->obj;
	}

	//listar
	function listar (Despesa $obj) {
		$this->sql = "SELECT * FROM despesa";
		$resultSet = mysqli_query($this->con, $this->sql);
		if(!$resultSet) {
			die('[ERRO]: Class(Banco) | Metodo(Listar) | Erro('.mysqli_error($this->con).')');
		}
		while($row = mysqli_fetch_object($resultSet)) {
			//classe usuario
			$controlUsuario = new UsuarioControl(new Usuario($row->idusuario));
			$objUsuario = $controlUsuario->buscarPorId();
			$this->obj = new Despesa($row->id, $objUsuario, $row->descricao, $row->valor, $row->quantidade, $row->prestacoes, $row->dataaquisicao, $row->datavencimento, $row->ativo, $row->datacadastro, $row->dataedicao);
			array_push($this->lista, $this->obj);
		}
		return $this->lista;
	}

	//atualizar
	function atualizar (Despesa $obj) {
		$this->sql = sprintf("UPDATE despesa SET idusuario = %d, descricao = '%s', valor = %f, quantidade = %d, prestacoes = %d, dataaquisicao = '%s', datavencimento = '%s', ativo = '%s', dataedicao = '%s' WHERE id = %d ",
			mysqli_real_escape_string($this->con, $obj->getObjusuario()->getId()),
			mysqli_real_escape_string($this->con, $obj->getDescricao()),
			mysqli_real_escape_string($this->con, $obj->getValor()),
			mysqli_real_escape_string($this->con, $obj->getQuantidade()),
			mysqli_real_escape_string($this->con, $obj->getPrestacoes()),
			mysqli_real_escape_string($this->con, $obj->getDataaquisicao()),
			mysqli_real_escape_string($this->con, $obj->getDatavencimento()),
			mysqli_real_escape_string($this->con, $obj->getAtivo()),
			mysqli_real_escape_string($this->con, date('Y-m-d')),
			mysqli_real_escape_string($this->con, $obj->getId()));
		if(!mysqli_query($this->con, $this->sql)) {
			die('[ERRO]: Class('.get_class($obj).') | Metodo(Atualizar) | Erro('.mysqli_error($this->con).')');
		}
		return mysqli_insert_id($this->con);
	}

	//deletar
	function deletar (Despesa $obj) {
		$this->sql = sprintf("DELETE FROM despesa WHERE id = %d",
			mysqli_real_escape_string($this->con, $obj->getId()));
		$resultSet = mysqli_query($this->con, $this->sql);
		if(!$resultSet) {
			die('[ERRO]: Class('.get_class($obj).') | Metodo(Deletar) | Erro('.mysqli_error($this->con).')');
		}
		return true;
	}

	//listar paginado
	function listarPaginado($start, $limit) {
		$this->sql = "SELECT * FROM despesa limit " . $start . ", " . $limit;
		$result = mysqli_query ( $this->con, $this->sql );
		if (! $result) {
			die ( '[ERRO]: ' . mysqli_error ( $this->con ) );
		}
		$this->lista = array();
		while ( $row = mysqli_fetch_assoc ( $result ) ) {
			$this->lista=$row;
		}
		//teste
		return $this->lista;
	}
	//quantidade total
	function qtdTotal() {
		$this->sql = "SELECT count(*) as quantidade FROM despesa";
		$result = mysqli_query ( $this->con, $this->sql );
		if (! $result) {
			die ( '[ERRO]: ' . mysqli_error ( $this->con ) );
		}
		$total = 0;
		while ( $row = mysqli_fetch_object ( $result ) ) {
			$total = $row->quantidade;
		}
		return $total;
	}
}

// Classe gerada com BlackCoffeePHP 1.0 - by Adelson Guimarães
?>