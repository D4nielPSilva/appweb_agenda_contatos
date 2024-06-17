const Sequelize = require('sequelize');
const database = require('../db');

const Grupo = database.define('grupo', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nomeGrupo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: true,
    }
}
);

module.exports = Grupo;