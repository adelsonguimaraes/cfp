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
	private $superdao;

	//construtor
	public function __construct($con) {
		$this->con = $con;
		$this->superdao = new SuperDAO('despesa');
	}

	//cadastrar
	function cadastrar (Despesa $obj) {
	function cadastrar ( Despesa $obj ) {
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
		$this->superdao->resetResponse();

	//listar
	function listar (Despesa $obj) {
		$this->sql = "SELECT * FROM despesa";
		$resultSet = mysqli_query($this->con, $this->sql);
		if(!$resultSet) {
			die('[ERRO]: Class(Banco) | Metodo(Listar) | Erro('.mysqli_error($this->con).')');
		if( !mysqli_query( $this->con, $this->sql ) ) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), get_class( $obj ), 'Cadastrar' ) );
		}else{
			$this->superdao->setSuccess( true );
			$this->superdao->setData( mysqli_insert_id( $this->con ) );
		}
		while($row = mysqli_fetch_object($resultSet)) {
			//classe usuario
			$controlUsuario = new UsuarioControl(new Usuario($row->idusuario));
			$objUsuario = $controlUsuario->buscarPorId();
			$this->obj = new Despesa($row->id, $objUsuario, $row->descricao, $row->valor, $row->quantidade, $row->prestacoes, $row->dataaquisicao, $row->datavencimento, $row->ativo, $row->datacadastro, $row->dataedicao);
			array_push($this->lista, $this->obj);
		}
		return $this->lista;
		return $this->superdao->getResponse();
	}

	//atualizar
	function atualizar (Despesa $obj) {
	function atualizar ( Despesa $obj ) {
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
		
		$this->superdao->resetResponse();

		if( !mysqli_query( $this->con, $this->sql ) ) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), get_class( $obj ), 'Atualizar' ) );
		}else{
			$this->superdao->setSuccess( true );
			$this->superdao->setData( true );
		}
		return mysqli_insert_id($this->con);
		return $this->superdao->getResponse();
	}

	//buscarPorId
	function buscarPorId (Despesa $obj) {
		$this->sql = sprintf("SELECT * FROM despesa WHERE id = %d",
			mysqli_real_escape_string($this->con, $obj->getId()));
		$result = mysqli_query($this->con, $this->sql);
		
		$this->superdao->resetResponse();

		if( !mysqli_query( $this->con, $this->sql ) ) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), get_class( $obj ), 'Atualizar' ) );
		}else{
			while($row = mysqli_fetch_object($result)) {
				//classe usuario
				// $controlUsuario = new UsuarioControl(new Usuario($row->idusuario));
				// $objUsuario = $controlUsuario->buscarPorId();
				// $this->obj = new Despesa($row->id, $objUsuario, $row->descricao, $row->valor, $row->quantidade, $row->prestacoes, $row->dataaquisicao, $row->datavencimento, $row->ativo, $row->datacadastro, $row->dataedicao);
				array_push( $this->lista, $row );
			}
			$this->superdao->setSuccess( true );
			$this->superdao->setData( $this->lista );
		}
		return $this->superdao->getResponse();
	}

	//listar
	function listar () {
		$this->sql = "SELECT * FROM despesa";
		$result = mysqli_query($this->con, $this->sql);
		$this->superdao->resetResponse();

		if( !mysqli_query( $this->con, $this->sql ) ) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), get_class( $obj ), 'Atualizar' ) );
		}else{
			while($row = mysqli_fetch_object($result)) {
				//classe usuario
				// $controlUsuario = new UsuarioControl(new Usuario($row->idusuario));
				// $objUsuario = $controlUsuario->buscarPorId();
				// $this->obj = new Despesa($row->id, $objUsuario, $row->descricao, $row->valor, $row->quantidade, $row->prestacoes, $row->dataaquisicao, $row->datavencimento, $row->ativo, $row->datacadastro, $row->dataedicao);
				array_push( $this->lista, $row );
			}
			$this->superdao->setSuccess( true );
			$this->superdao->setData( $this->lista );
		}
		return $this->superdao->getResponse();
	}

	//listar
	function listarPorUsuario ( $idusuario ) {
		$this->sql = "SELECT * FROM despesa WHERE idusuario = $idusuario";
		$result = mysqli_query($this->con, $this->sql);

		$this->superdao->resetResponse();

		if( !mysqli_query( $this->con, $this->sql ) ) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), get_class( $obj ), 'Atualizar' ) );
		}else{
			while($row = mysqli_fetch_object($result)) {
				//classe usuario
				// $controlUsuario = new UsuarioControl(new Usuario($row->idusuario));
				// $objUsuario = $controlUsuario->buscarPorId();
				// $this->obj = new Despesa($row->id, $objUsuario, $row->descricao, $row->valor, $row->quantidade, $row->prestacoes, $row->dataaquisicao, $row->datavencimento, $row->ativo, $row->datacadastro, $row->dataedicao);
				array_push( $this->lista, $row );
			}
			$this->superdao->setSuccess( true );
			$this->superdao->setData( $this->lista );
		}
		return $this->superdao->getResponse();
	}

	//deletar
	function deletar (Despesa $obj) {
			
		$this->superdao->resetResponse();

		// buscando por dependentes
        $dependentes = $this->superdao->verificaDependentes($obj->getId());
		if ( $dependentes > 0 ) {
		    $this->superdao->setMsg( resolve( '0001', $dependentes, get_class( $obj ), 'Deletar' ));
			return $this->superdao->getResponse();
		}

		$this->sql = sprintf("DELETE FROM despesa WHERE id = %d",
			mysqli_real_escape_string($this->con, $obj->getId()));
		$resultSet = mysqli_query($this->con, $this->sql);
		if(!$resultSet) {
			die('[ERRO]: Class('.get_class($obj).') | Metodo(Deletar) | Erro('.mysqli_error($this->con).')');
		$result = mysqli_query($this->con, $this->sql);
		
		if ( !$result ) {
            $this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), get_class( $obj ), 'Deletar' ));
			return $this->superdao->getResponse();
		}
		return true;

		$this->superdao->setSuccess( true );
		$this->superdao->setData( true );

		return $this->superdao->getResponse();
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