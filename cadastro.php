<?php

include 'conexao.php';

if (isset($_POST['nome']) && isset($_POST['email']) && isset($_POST['senha'])) {
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $senha = $_POST['senha'];
    $senha_hash = password_hash($senha, PASSWORD_DEFAULT);

} else {
    $nome = "";
    $email = "";
    $senha = "";
}

$sql = "INSERT INTO usuario (nome, email, senha) VALUES ('$nome', '$email', '$senha_hash')";

if ($conn->query($sql) === TRUE) {
    echo "Cadastro realizado com sucesso!";
    header("Location: index.html");
exit;

} else {
    echo "Erro: " . $sql . "<br>" . $conn->error;
}

$conn->close();

?>