const Sequelize = require('sequelize');
const database = require('../db');
const Lista = require('./lista');

const Contato = database.define('contato', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    emailContato: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nomeContato: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sobrenomeContato: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefoneContato: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dataNascimentoContato: {
        type: Sequelize.STRING,
        allowNull: false
    },
    listaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: "01",
        references: {
            model: Lista,
            key: 'id'
        }
    }
});

Contato.belongsTo(Lista, { foreignKey: 'listaId' });

module.exports = Contato;