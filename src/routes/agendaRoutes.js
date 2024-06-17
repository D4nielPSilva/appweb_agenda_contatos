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
router.post('/cadastrar_contato', agendaController.cadastrarContato);
router.get('/api/usuarios', usuarioController.listarUsuarios);
router.post('/cadastrar_usuario', usuarioController.cadastrarUsuario);

module.exports = router;