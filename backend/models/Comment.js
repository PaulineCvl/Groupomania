const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
require('dotenv').config();

const sequelize = new Sequelize('groupomaniatest', 'root', process.env.DB_CONNECT_SEQUELIZE, {
    dialect: 'mysql'
});

const Comment = sequelize.define('comment', {
    message: {type: DataTypes.TEXT}
},
{
    freezeTableName: true,
});

module.exports = Comment;