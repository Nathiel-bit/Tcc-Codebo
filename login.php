<?php

include 'conexao.php';

if (isset($_POST['email']) && isset($_POST['senha'])) {
$email = $_POST['email'];
$senha = $_POST['senha'];

} else {
    $email = "";
    $senha = "";
}

$sql = "SELECT * FROM usuario WHERE email='$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $usuario = $result->fetch_assoc();

    if (password_verify($senha, $usuario['senha'])) {
        echo "Login bem-sucedido!";
        header("Location: index.html");
exit;

    } else {
        echo "Senha incorreta.";
    }
} else {
    echo "Email não encontrado.";
}


$conn->close();
?>