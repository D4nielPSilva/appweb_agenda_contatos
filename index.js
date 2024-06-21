const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();
const path = require('path');   
const db = require('./src/db')

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/src/views');
app.use(express.json());
app.use(express.static(path.join(__dirname, 'src/views')));
app.use(express.urlencoded({extended: true}));
app.use('/', require('./src/routes/agendaRoutes'));

db.sync(() => console.log(`Banco de dados conectado`));

const PORT = 8080;
app.listen(PORT, function () {
    console.log('app rodando na porta ' + PORT);
});
