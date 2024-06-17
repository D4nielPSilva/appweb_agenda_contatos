const Sequelize = require('sequelize');
const database = require('../db');

const Contato = database.define('contato', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    
    emailContato: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    nomeContato: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sobrenomeContato: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dataNascimentoContato: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefoneContato: {
        type: Sequelize.STRING,
        allowNull: false
    },
    idLista: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'lista', 
            key: 'id'
        }
    },
    idGrupo: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'Grupo', 
            key: 'id'
        }
    },
    idCategoria: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'Categoria',
        }
    }
}
);

module.exports = Contato;