<?php
require_once 'db.php';

if(isset($_GET['id'])) {
    $id = $_GET['id'];


        // Verifica se a consulta está correta
        $sql = "SELECT * FROM users WHERE id = $id";
        $result = $conn->query($sql);

        if($result !== false && $result->num_rows > 0) {
            $row = $result->fetch_assoc();
            ?>
            <form id="edit-form">
            <input type="hidden" name="id" value="<?php echo $id; ?>">
            <label for="name">Nome:</label>
            <input type="text" id="name" name="name" value="<?php echo $row['name']; ?>" required><br>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" value="<?php echo $row['email']; ?>" required><br>
            <label for="motivo_contato">Motivo do Contato:</label>
            <textarea id="motivo_contato" name="motivo_contato" maxlength="500" required><?php echo $row['motivo_contato']; ?></textarea><br>
            <button type="submit">Atualizar</button>
        </form>
        <?php
    } else {
        echo "Registro não encontrado!";
    }
} else {
    echo "O ID não foi fornecido!";
}
$conn->close();
?>
