const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();
const path = require('path'); 
const session = require('express-session')
const db = require('./src/db')
const bodyParser = require('body-parser');


app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/src/views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'src/views')));
app.use(express.urlencoded({extended: true}));
app.use('/', require('./src/routes/agendaRoutes'));

app.use(session({
    secret: 'secret-token',
    name: 'sessionId',  
    resave: false,
    saveUninitialized: false
}))

db.sync(() => console.log(`Banco de dados conectado`));

const PORT = 8080;
app.listen(PORT, function () {
    console.log('app rodando na porta ' + PORT);
});
