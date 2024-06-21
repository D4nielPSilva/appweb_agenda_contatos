const Contato = require('../model/contato');
const Lista = require('../model/lista'); 
const { Op } = require('sequelize');


function indexView(req, res){
    res.render(`index.html`);
}

async function agendaView(req, res){
    const listas = await Lista.findAll();
    res.render('agenda.html', { listas });
    }

async function contatoView(req, res){
    const listas = await Lista.findAll();
    res.render('contato.html', { listas });
}

function cadastrarContato(req, res) {
    let contato = {
        emailContato: req.body['email-contato'],
        nomeContato: req.body.name,
        sobrenomeContato: req.body.lastname,
        telefoneContato: req.body.nmrtelefone,
        dataNascimentoContato: req.body.datanascimento,
        listaId: req.body.lista 
    };
    Contato.create(contato)
        .then(() => {
            let sucesso = true;
            res.render("agenda.html", { sucesso });
        })
        .catch((err) => {
            console.error('Erro ao cadastrar contato:', err);
            let erro = true;
            res.render("agenda.html", { erro });
        });
}


async function listarContatos(req, res){
    const contatos = await Contato.findAll();
        res.json({ contatos });
}

async function listarContatosLista(req,res){
    const { listaId } = req.params;
    const contatos = await Contato.findAll({ where: { listaId } });
        res.json({ contatos });
}

async function buscarContatos(req, res) {
    const busca = req.query.q; 
    const resultado = await Contato.findAll({
        where: {
            [Op.or]: [
                {
                    nomeContato: {
                        [Op.like]: `%${busca}%`
                    }
                },
                {
                    sobrenomeContato: {
                        [Op.like]: `%${busca}%`
                    }
                }
            ]
        }
    });

    const contatos = resultado.map(contato => contato.get({ plain: true }));

    res.render('agenda.html', { busca_contato: contatos, busca });
}
async function contatoDetalheView(req, res) {
    const { id } = req.params; // Obter o ID do parâmetro da URL
    const contato = await Contato.findByPk(id); // Buscar usuário pelo ID
    if (!contato) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.render('detalhes.html', { contato });
}

async function editarContato(req, res) {
    const { id } = req.params;
    const {
        nome,
        email,
        sobrenome,
        dataNascimento,
        telefone
        } = req.body;
    
    const contato = await Contato.findByPk(id);
    if (!contato) {
        return res.status(404).send('contato não encontrado');
    }
    contato.nomeContato = nome;
    contato.emailContato - email;
    contato.sobrenomeContato = sobrenome;
    contato.dataNascimento = dataNascimento;
    contato.telefoneContato = telefone;
    await contato.save();
    res.redirect(`/contato/${id}`);    
}


async function excluirContato(req,res){
    const { id } = req.params;
    const contato = await Contato.findByPk(id);
        if (!contato) {
            return res.status(404).send('Contato não encontrado');
        }
        await contato.destroy();
        res.redirect('/agenda');
}

function criarLista(req, res) {
    let lista = new Lista({
        nomeLista: req.body.nomeLista,
        descricaoLista: req.body.descricaoLista
    });

    lista.save()
        .then(() => {
            console.log('Lista criada com sucesso!');
            res.json({ sucesso: true });
        })
        .catch(err => {
            console.error('Erro ao criar a lista:', err);
            res.status(500).json({ erro: 'Erro ao criar a lista.' });
        });
};

async function listarlistas (req,res){
    const listas = await Lista.findAll();
    res.json(listas);   
};

module.exports = {
    indexView,
    cadastrarContato,
    agendaView,
    criarLista,
    listarlistas,
    listarContatos,
    listarContatosLista,
    contatoView,
    buscarContatos,
    contatoDetalheView,
    editarContato,
    excluirContato
}