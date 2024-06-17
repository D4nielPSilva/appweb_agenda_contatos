const Sequelize = require('sequelize');
const database = require('../db');

const Usuario = database.define('usuario', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    emailCadastro: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    senhaCadastro: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sobrenome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dataNascimento: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pais: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Usuario;