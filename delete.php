<?php
require_once 'db.php';

if (isset($_POST['id'])) {
    $id = $_POST['id'];

    $sql = "DELETE FROM users WHERE id = $id";
    if ($conn->query($sql)) {
        echo "Registro deletado com sucesso!";
    } else {
        echo "Erro ao deletar o registro: " . $conn->error;
    }
} else {
    echo "O ID não foi fornecido!";
}
$conn->close();
?>
