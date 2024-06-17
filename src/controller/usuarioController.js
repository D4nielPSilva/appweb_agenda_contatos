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
module.exports = {
    criarContaView,
    listarUsuarios,
    cadastrarUsuario,
    loginContaView,
}