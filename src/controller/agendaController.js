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
    res.redirect('/home_page.html');
}

module.exports = {
    indexView,
    cadastrarContato,
    agendaView
}