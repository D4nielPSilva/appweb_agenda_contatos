const Sequelize = require('sequelize');
const database = require('../db');

const Lista = database.define('lista', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nomeLista: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: true,
    }
}
);

module.exports = Lista;