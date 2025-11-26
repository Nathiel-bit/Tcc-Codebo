<?php
session_start();
include("conexao.php");

if (!isset($_SESSION['id_usuario'])) {
    die("ERRO: Usuário não está logado!");
}

$id_usuario = $_SESSION['id_usuario'];

$id_mapa = isset($_POST['id_mapa']) ? $_POST['id_mapa'] : null;
$nome = $_POST['nome'];
$data_criacao = date('Y-m-d H:i:s');
$map = $_POST['map'];
$tipo = $_POST['tipo'];

$sql = "INSERT INTO mapas (id_mapa, nome, data_criacao, map, tipo, id_usuario) 
        VALUES (?, NOW(), ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param($id_mapa, $nome, $data_criacao, $map, $tipo, $id_usuario);

if ($stmt->execute()) {
    echo "OK";
} else {
    echo "Erro ao salvar: " . $stmt->error;
}