<?php
session_start();
include("conexao.php");

/*if (!isset($_SESSION['id_usuario'])) {
    die("ERRO: Usuário não está logado!");
}*/

$id_usuario = 1; //$_SESSION['id_usuario'];
$id_mapa = isset($_POST['id_mapa']) ? $_POST['id_mapa'] : null;
$nome = $_POST['nome'];
$data_criacao = date('Y-m-d H:i:s');
$map =  $_POST['mapa'];
$tipo = $_POST['tipo'];

if( $id_mapa != null){
    $sql = "INSERT INTO mapas(id_mapa, nome, data_criacao, map, tipo, id_usuario) 
            VALUES (?, ?, CURDATE(), ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("isssi", $id_mapa, $nome, $map, $tipo, $id_usuario);

}else{
    $sql = "INSERT INTO mapas(nome, data_criacao, map, tipo, id_usuario) 
        VALUES (?, CURDATE(), ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssi", $nome, $map, $tipo, $id_usuario);

}

$array = [];


if ($stmt->execute()) {
    $array['estado'] = 'ok';
    echo json_encode( $array);
} else {
    //echo "Erro ao salvar: " . $stmt->error;
    $array['estado'] = 'error';
    echo json_encode( $array);
}