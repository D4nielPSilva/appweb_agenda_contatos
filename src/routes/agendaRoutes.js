const express = require('express');
const router  = express.Router();
const estoqueController = require('../controllers/agendaController');

router.get('/', agendaController.indexView);
router.get('/login_conta', agendaController.loginContaView);
router.get('/criar_conta', agendaController.criarContaView);
router.post('/cadastrar_usuario', agendaController.cadastrarUsuario);
router.get('/home_page', agendaController.homePageView);
router.post('/cadastrar_contato', agendaController.cadastrarContato);

module.exports = router;