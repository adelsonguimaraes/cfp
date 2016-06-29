<?php
// dao : recebimento

/*
	Projeto: CFP - Controle Financeiro Pessoal.
	Project Owner: Adelson Guimarães Monteiro.
	Desenvolvedor: Adelson Guimarães Monteiro.
	Data de início: 20/06/2016.
	Data Atual: 29/06/2016.
*/

Class RecebimentoDAO {
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
	function cadastrar (Recebimento $obj) {
		$this->sql = sprintf("INSERT INTO recebimento(idusuario, descricao, valor, dataarrecadacao, tipo, ativo)
		VALUES(%d, '%s', %f, '%s', '%s', '%s')",
			mysqli_real_escape_string($this->con, $obj->getObjusuario()->getId()),
			mysqli_real_escape_string($this->con, $obj->getDescricao()),
			mysqli_real_escape_string($this->con, $obj->getValor()),
			mysqli_real_escape_string($this->con, $obj->getDataarrecadacao()),
			mysqli_real_escape_string($this->con, $obj->getTipo()),
			mysqli_real_escape_string($this->con, $obj->getAtivo()));
		if(!mysqli_query($this->con, $this->sql)) {
			die('[ERRO]: Class('.get_class($obj).') | Metodo(Cadastrar) | Erro('.mysqli_error($this->con).')');
		}
		return mysqli_insert_id($this->con);
	}

	//buscarPorId
	function buscarPorId (Recebimento $obj) {
		$this->sql = sprintf("SELECT * FROM recebimento WHERE id = %d",
			mysqli_real_escape_string($this->con, $obj->getId()));
		$resultSet = mysqli_query($this->con, $this->sql);
		if(!$resultSet) {
			die('[ERRO]: Class('.get_class($obj).') | Metodo(BuscarPorId) | Erro('.mysqli_error($this->con).')');
		}
		while($row = mysqli_fetch_object($resultSet)) {
			//classe usuario
			$controlUsuario = new UsuarioControl(new Usuario($row->idusuario));
			$objUsuario = $controlUsuario->buscarPorId();
			$this->obj = new Recebimento($row->id, $objUsuario, $row->descricao, $row->valor, $row->dataarrecadacao, $row->tipo, $row->ativo, $row->datacadastro, $row->dataedicao);
		}
		return $this->obj;
	}

	//listar
	function listar (Recebimento $obj) {
		$this->sql = "SELECT * FROM recebimento";
		$resultSet = mysqli_query($this->con, $this->sql);
		if(!$resultSet) {
			die('[ERRO]: Class(Banco) | Metodo(Listar) | Erro('.mysqli_error($this->con).')');
		}
		while($row = mysqli_fetch_object($resultSet)) {
			//classe usuario
			$controlUsuario = new UsuarioControl(new Usuario($row->idusuario));
			$objUsuario = $controlUsuario->buscarPorId();
			$this->obj = new Recebimento($row->id, $objUsuario, $row->descricao, $row->valor, $row->dataarrecadacao, $row->tipo, $row->ativo, $row->datacadastro, $row->dataedicao);
			array_push($this->lista, $this->obj);
		}
		return $this->lista;
	}

	//atualizar
	function atualizar (Recebimento $obj) {
		$this->sql = sprintf("UPDATE recebimento SET idusuario = %d, descricao = '%s', valor = %f, dataarrecadacao = '%s', tipo = '%s', ativo = '%s', dataedicao = '%s' WHERE id = %d ",
			mysqli_real_escape_string($this->con, $obj->getObjusuario()->getId()),
			mysqli_real_escape_string($this->con, $obj->getDescricao()),
			mysqli_real_escape_string($this->con, $obj->getValor()),
			mysqli_real_escape_string($this->con, $obj->getDataarrecadacao()),
			mysqli_real_escape_string($this->con, $obj->getTipo()),
			mysqli_real_escape_string($this->con, $obj->getAtivo()),
			mysqli_real_escape_string($this->con, date('Y-m-d')),
			mysqli_real_escape_string($this->con, $obj->getId()));
		if(!mysqli_query($this->con, $this->sql)) {
			die('[ERRO]: Class('.get_class($obj).') | Metodo(Atualizar) | Erro('.mysqli_error($this->con).')');
		}
		return mysqli_insert_id($this->con);
	}

	//deletar
	function deletar (Recebimento $obj) {
		$this->sql = sprintf("DELETE FROM recebimento WHERE id = %d",
			mysqli_real_escape_string($this->con, $obj->getId()));
		$resultSet = mysqli_query($this->con, $this->sql);
		if(!$resultSet) {
			die('[ERRO]: Class('.get_class($obj).') | Metodo(Deletar) | Erro('.mysqli_error($this->con).')');
		}
		return true;
	}

	//listar paginado
	function listarPaginado($start, $limit) {
		$this->sql = "SELECT * FROM recebimento limit " . $start . ", " . $limit;
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
		$this->sql = "SELECT count(*) as quantidade FROM recebimento";
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