<?php
require_once 'db.php';

if (isset($_POST['id']) && isset($_POST['name']) && isset($_POST['email']) && isset($_POST['motivo_contato'])) {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $email = $_POST['email'];
    $motivo_contato = $_POST['motivo_contato'];

    $sql = "UPDATE users SET name = '$name', email = '$email', motivo_contato = '$motivo_contato' WHERE id = $id";
    if ($conn->query($sql)) {
        echo "Registro atualizado com sucesso!";
    } else {
        echo "Erro ao atualizar o registro: " . $conn->error;
    }
} else {
    echo "Os parâmetros necessários não foram fornecidos!";
}
$conn->close();
?>
