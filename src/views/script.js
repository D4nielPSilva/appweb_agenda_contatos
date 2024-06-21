$(document).ready(function() {
    function carregarListas() {
        $.ajax({
            url: '/listar_listas',
            method: 'GET',
            success: function(listas) {
                $('#listas').empty();
                var $todosContatosElement = $('<div class="lista" id="btnListarTodosContatos">')
                    .append($('<img class="icon-lista" src="assets/pessoas (1) 1.png" alt="">'))
                    .append($('<p>').text('Todos os Contatos'))
                    .append($('<div id="todosContatos" class="listaContatos hidden">'));

                $('#listas').append($todosContatosElement);

                listas.forEach(function(lista) {
                    var $listaElement = $('<div class="lista">')
                        .append($('<img class="icon-lista" src="assets/pessoas (1) 1.png" alt="">'))
                        .append($('<p>').text(lista.nomeLista))
                        .append($('<div class="listaContatos hidden">'))
                        .attr('data-lista-id', lista.id);

                    $('#listas').append($listaElement);
                });

                $('.lista').on('click', function() {
                    const listaElement = $(this);
                    const listaContatos = listaElement.find('.listaContatos');
                    const isHidden = listaContatos.hasClass('hidden');
                    const originalText = listaElement.find('p').text();

                    $('.listaContatos').addClass('hidden');
                    $('.lista p').text(function() {
                        return $(this).data('original-text');
                    });

                    const listaId = listaElement.attr('data-lista-id');
                    if (listaId) {
                        if (isHidden) {
                            listaContatos.removeClass('hidden');
                            listaElement.find('p').data('original-text', originalText);

                            fetch(`/listar_contatos/${listaId}`)
                                .then(response => response.json())
                                .then(data => {
                                    const contatosElement = $('.contats');
                                    contatosElement.empty();

                                    if (data.contatos.length > 0) {
                                        const template = `
                                            <ul>
                                                {{#contatos}}
                                                    <li>{{nomeContato}} {{sobrenomeContato}}</li>
                                                {{/contatos}}
                                            </ul>
                                        `;
                                        const rendered = Mustache.render(template, { contatos: data.contatos });
                                        contatosElement.html(rendered);
                                    } else {
                                        contatosElement.html('<p>Nenhum contato encontrado nessa lista.</p>');
                                    }
                                })
                                .catch(error => {
                                    console.error('Erro ao buscar contatos:', error);
                                    $('.contats').html('<p>Erro ao buscar contatos.</p>');
                                });
                        } else {
                            listaContatos.addClass('hidden');
                            $('.contats').empty(); 
                        }
                    }
                });

                $('#btnListarTodosContatos').on('click', function(event) {
                    event.stopPropagation(); 

                    const todosContatos = $('#todosContatos');
                    const isHidden = todosContatos.hasClass('hidden');

                    if (isHidden) {
                        todosContatos.removeClass('hidden');

                        fetch('/listar_contatos')
                            .then(response => response.json())
                            .then(data => {
                                const contatosElement = $('.contats');
                                contatosElement.empty();

                                if (data.contatos.length > 0) {
                                    const template = `
                                        <ul>
                                            {{#contatos}}
                                                <li>{{nomeContato}} {{sobrenomeContato}}</li>
                                            {{/contatos}}
                                        </ul>
                                    `;
                                    const rendered = Mustache.render(template, { contatos: data.contatos });
                                    contatosElement.html(rendered);
                                } else {
                                    contatosElement.html('<p>Nenhum contato encontrado.</p>');
                                }
                            })
                            .catch(error => {
                                console.error('Erro ao buscar contatos:', error);
                                $('.contats').html('<p>Erro ao buscar contatos.</p>');
                            });
                    } else {
                        todosContatos.addClass('hidden');
                        $('.contats').empty(); 
                    }
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Erro ao carregar as listas:', textStatus, errorThrown);
            }
        });
    }

    carregarListas();

    $('#btnAdicionarLista').on('click', function() {
        $('#formLista').toggle();
    });

    $('#btnSalvarLista').on('click', function() {
        const nomeLista = $('#nomeLista').val();
        const descricaoLista = $('#descricaoLista').val();

        $.ajax({
            url: '/criar_lista',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ nomeLista: nomeLista, descricaoLista: descricaoLista }),
            success: function(response) {
                console.log('Lista criada com sucesso:', response);
                $('#nomeLista').val('');
                $('#descricaoLista').val('');
                $('#formLista').fadeOut();
                carregarListas();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Erro ao criar a lista:', textStatus, errorThrown);
            }
        });
    });
});
function toggleMenu() {
    const userMenu = document.getElementById('userMenu');
    userMenu.style.display = userMenu.style.display === 'none' ? 'flex' : 'none';
}

document.addEventListener('click', function(event) {
    const userMenu = document.getElementById('userMenu');
    const userIcon = document.querySelector('.user-icon');
    if (!userIcon.contains(event.target)) {
        userMenu.style.display = 'none';
    }
});