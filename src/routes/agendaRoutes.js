const express = require('express');
const router  = express.Router();
const agendaController = require('../controller/agendaController');
const autenticacaoController = require('../controller/autenticacaoController');
const usuarioController = require('../controller/usuarioController');

router.get('/', agendaController.indexView);
router.get('/login', usuarioController.loginContaView);
router.post('/login_conta', autenticacaoController.autenticar);
router.get('/criar_conta', usuarioController.criarContaView);
router.get('/agenda', agendaController.agendaView);
router.get('/contato', agendaController.contatoView);
router.post('/cadastrar_contato', agendaController.cadastrarContato);
router.get('/api/usuarios', usuarioController.listarUsuarios);
router.post('/cadastrar_usuario', usuarioController.cadastrarUsuario);
router.get('/buscar_contatos', agendaController.buscarContatos );
router.post('/criar_lista', agendaController.criarLista);
router.get('/listar_listas', agendaController.listarlistas);
router.get('/listar_contatos', agendaController.listarContatos)
router.get('/listar_contatos/:listaId', agendaController.listarContatosLista)
router.get('/sair', autenticacaoController.sair)
router.get('/usuario/:id', usuarioController.usuarioView);
router.post('/usuario/editar/:id', usuarioController.editarUsuario);
router.get('/contato/:id', agendaController.contatoDetalheView);
router.post('/contato/editar/:id', agendaController.editarContato);
router.post('/contato/excluir/:id', agendaController.excluirContato);


module.exports = router;