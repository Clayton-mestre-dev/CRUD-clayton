document.addEventListener('DOMContentLoaded', function () {
    loadData();

    // Adiciona evento de envio ao formulário de criação
    document.getElementById('create-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const motivo_contato = document.getElementById('motivo_contato').value;
        createData(name, email, motivo_contato);
    });

    document.getElementById('data-table').addEventListener('click', function (e) {
        if (e.target.classList.contains('edit-btn')) {
            var modal = document.getElementById('edit-modal');
            modal.style.display = 'block';

            var id = e.target.getAttribute('data-id'); 

            // Carrega o formulário de edição no modal
            //console.log('ID sendo enviado para o edit.php:', id);
            fetch('edit.php?id=' + id)
                .then(response => response.text())
                .then(data => {
                    //console.log('Dados carregados:', data);
                    var editFormContainer = document.querySelector('#edit-form-container');
                    editFormContainer.innerHTML = data;

                    document.getElementById('edit-form-container').addEventListener('submit', function (e) {
                        e.preventDefault();
                        var editForm = document.getElementById('edit-form');
                        var id = editForm.querySelector('input[name="id"]').value;
                        var name = editForm.querySelector('input[name="name"]').value;
                        var email = editForm.querySelector('input[name="email"]').value;
                        var motivo_contato = editForm.querySelector('textarea[name="motivo_contato"]').value;
                        updateData(id, name, email, motivo_contato);
                        document.getElementById('edit-modal').style.display = 'none';
                    }, { once: true });

                })
                .catch(error => {
                    console.error('Erro ao carregar os dados:', error);
                });
        } else if (e.target.classList.contains('delete-btn')) {
            var id = e.target.getAttribute('data-id');
            deleteData(id);
        }
    });

    // Para fechar o modal
    document.querySelector('.close-btn').addEventListener('click', function () {
        document.getElementById('edit-modal').style.display = 'none';
    });
});

// Função para carregar os dados da tabela
function loadData() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'fetch.php', true);
    xhr.onload = function () {
        if (this.status === 200) {
            document.querySelector('#data-table tbody').innerHTML = this.responseText;
        } else {
            console.error('Erro ao carregar os dados');
        }
    };
    xhr.send();
}

// Função para criar um novo registro
function createData(name, email, motivo_contato) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'create.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (this.status === 200) {
            loadData();
        } else {
            console.error('Erro ao criar o registro');
        }
    };
    xhr.send('name=' + name + '&email=' + email + '&motivo_contato=' + motivo_contato);
}

// Função para deletar um registro
function deleteData(id) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'delete.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (this.status === 200) {
            loadData();
        } else {
            console.error('Erro ao deletar o registro');
        }
    };
    xhr.send('id=' + id);
}

// Função para editar um registro
function updateData(id, name, email, motivo_contato) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'update.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (this.status === 200) {
            loadData();
        } else {
            console.error('Erro ao atualizar o registro');
        }
    };
    xhr.send('id=' + id + '&name=' + name + '&email=' + email + '&motivo_contato=' + motivo_contato);
}
