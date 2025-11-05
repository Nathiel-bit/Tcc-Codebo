<?php
$host = "localhost";
$usuario = "root";      
$senha = "";          
$dbname = "tcc_codebo";

$conn = new mysqli($host, $usuario, $senha, $dbname);

// Checa a conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}
?>