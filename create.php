<?php
require_once 'db.php';

if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['motivo_contato'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $motivo_contato = $_POST['motivo_contato'];

    $sql = "INSERT INTO users (name, email, motivo_contato) VALUES ('$name', '$email', '$motivo_contato')";
    if ($conn->query($sql)) {
        echo "Registro criado com sucesso!";
    } else {
        echo "Erro ao criar o registro: " . $conn->error;
    }
} else {
    echo "Os parâmetros necessários não foram fornecidos!";
}
$conn->close();
?>
