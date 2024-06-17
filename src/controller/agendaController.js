function indexView(req, res){
    res.render(`index.html`);
}

function criarContaView(req, res){
    res.render(`usuario_cadastro.html`);
}

function loginContaView(req, res){
    res.render(`login.html`);
}

function agendaView(req, res){
    res.render(`agenda.html`);
}

function loginConta(req, res) {
    const email = req.body.email;
    const senha = req.body.senha;
    const validCredentials = validateCredentials(email, senha);

    if (validCredentials) {
        console.log("Login successful for user:", email);
        req.session.isLoggedIn = true;
        res.redirect('/agenda');
    } else {
        console.error("Login failed for user")
        res.render('login.html', { error: 'Email ou senha inválido' });
    }
}

function cadastrarUsuario(req, res){
    let usuario = {
        emailCadastro:req.body.emailCadastro,
        senhaCadastro:req.body.senhaCadastro,
        confirmSenhaCadastro:req.body.confirmSenhaCadastro,
        nome:req.body.nome,
        sobrenome:req.body.sobrenome,
        telefone:req.body.telefone,
        Pais:req.body.Pais,
        dataNascimento:req.body.dataNascimento
    }
    console.log(usuario);
    res.redirect('/login.html');
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
    loginConta,
    criarContaView,
    cadastrarUsuario,
    loginContaView,
    cadastrarContato,
    agendaView
}