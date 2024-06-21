const Usuario = require('../model/usuario');

function criarContaView(req, res){
    res.render(`cadastro.html`);
}

function loginContaView(req, res){
    res.render(`login.html`);
}
function cadastrarUsuario(req, res){
    console.log(req.body);
    let usuario = {
        emailCadastro: req.body.emailCadastro,
        senhaCadastro: req.body.senhaCadastro, 
        nome: req.body.Nome,
        sobrenome: req.body.Sobrenome,
        telefone: req.body.telefone,
        pais: req.body.Pais,
        dataNascimento: req.body['Data de Nascimento']
    }

    Usuario.create(usuario).then(()=>{
        let sucesso = true;
        res.render("login.html", {sucesso});
    }).catch((err)=>{
        console.log(err);
        let erro = true;
        res.render("login.html", {erro});
    });
}

function listarUsuarios(req, res) {
    Usuario.findAll().then((usuarios)=>{
        res.json(usuarios);
    }).catch((err)=>{
        res.json(err);
    });
}

async function usuarioView(req, res) {
    const { id } = req.params; 
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.render('usuario', { usuario });
}


async function editarUsuario(req, res) {
    const { id } = req.params;
    const {
        nome,
        sobrenome,
        dataNascimento,
        telefone,
        pais
    } = req.body;
    
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
        return res.status(404).send('Usuário não encontrado');
    }
    usuario.nome = nome;
    usuario.sobrenome = sobrenome;
    usuario.dataNascimento = dataNascimento;
    usuario.telefone = telefone;
    usuario.pais = pais;
    await usuario.save();
    res.redirect(`/usuario/${id}`);    
}

module.exports = {
    criarContaView,
    listarUsuarios,
    cadastrarUsuario,
    loginContaView,
    usuarioView,
    editarUsuario
}