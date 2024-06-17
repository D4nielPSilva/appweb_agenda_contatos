const Usuario = require('../model/usuario');

function indexView(req, res){
    res.render(`index.html`);
}

function agendaView(req, res){
    res.render(`agenda.html`);
}

function cadastrarContato(req, res){
    let contato = {
        email:req.body.email,
        nome:req.body.nome,
        sobrenome:req.body.sobrenome,
        telefone:req.body.telefone,
        dataNascimento:req.body.dataNascimento
    }
    console.log(contato);
    res.redirect('/agenda.html');
}

function listarContato(req,res){}
function buscarContatos(req,res){}
function editarContato(req,res){}
function excluirContato(req,res){}

function criarLista(req, res){
    console.log(req.body);
    let lista = {
        nomeLista: req.body.nomeLista,
        descricaoLista: req.body.descricaoLista
    }
    Lista.create(lista).then(()=>{
        let sucesso = true;
        res.render("agenda.html", {sucesso});
    }).catch((err)=>{
        console.log(err);
        let erro = true;
        res.render("agenda.html", {erro});
    });}

function criarGrupo(req, res){console.log(req.body);
    let criarGrupo = {
        nomeLista: req.body.nomeLista,
        descricaoLista: req.body.descricaoLista
    }
    Grupo.create(grupo).then(()=>{
        let sucesso = true;
        res.render("agenda.html", {sucesso});
    }).catch((err)=>{
        console.log(err);
        let erro = true;
        res.render("agenda.html", {erro});
    });}

function criarCategoria(req, res){console.log(req.body);
    let categoria = {
        nomeLista: req.body.nomeLista,
        descricaoLista: req.body.descricaoLista
    }
    Categoria.create(categoria).then(()=>{
        let sucesso = true;
        res.render("agenda.html", {sucesso});
    }).catch((err)=>{
        console.log(err);
        let erro = true;
        res.render("agenda.html", {erro});
    });}

module.exports = {
    indexView,
    cadastrarContato,
    agendaView,
    criarCategoria,
    criarGrupo,
    criarLista
}