const Usuario = require('../model/usuario');

async function autenticar(req, res) {
    const { email, senha } = req.body; 

    console.log(`Recebido - Email: ${email}, Senha: ${senha}`);

    try {
        const usuario = await Usuario.findOne({ where: { emailCadastro: email, senhaCadastro: senha } });

        if (usuario) {
            console.log('Usuário autenticado:', usuario);
            res.redirect('/agenda');
        } else {
            console.log('Usuário não encontrado ou senha incorreta');
            res.send('Usuário não encontrado ou senha incorreta');
        }
    } catch (error) {
        console.error('Erro durante a autenticação:', error);
        res.status(500).send('Erro interno do servidor');
    }
}
function sair(req, res) {
    res.redirect('/');
}

module.exports = {
    autenticar,
    sair
};