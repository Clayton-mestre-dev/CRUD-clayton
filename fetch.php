<?php
require_once 'db.php';

$sql = "SELECT id, name, email, motivo_contato FROM users";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "<tr>
                <td>{$row['id']}</td>
                <td>{$row['name']}</td>
                <td>{$row['email']}</td>
                <td>{$row['motivo_contato']}</td>
                <td>
                <button class='edit-btn' data-id='{$row['id']}'>Editar</button>
                <button class='delete-btn' data-id='{$row['id']}'>Deletar</button>
                </td>
              </tr>";
    }
} else {
    echo "<tr><td colspan='5'>Nenhum registro encontrado</td></tr>";
}
$conn->close();
?>
