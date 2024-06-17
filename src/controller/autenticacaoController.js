const Usuario = require('../model/usuario');

async function autenticar(req, res) {
    const { email, senha } = req.body; // Extract email and senha from the request body

    try {
        const usuario = await Usuario.findOne({ where: { emailCadastro: email, senhaCadastro: senha } });

        if (usuario) {
            res.redirect('/agenda'); 
        } else {
            res.send('Usuário não encontrado ou senha incorreta'); 
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).send('Internal server error');
    }
}

function sair(req, res) {
    req.session.destroy();
    res.redirect('/');
}

module.exports = {
    autenticar,
    sair
}