const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
require('dotenv').config();

const sequelize = new Sequelize('groupomania', 'root', process.env.DB_CONNECT_SEQUELIZE, {
    dialect: 'mysql'
});

const Like = sequelize.define('like', {
    like: {type: DataTypes.INTEGER}
},
{
    timestamps: false,
    freezeTableName: true,
});

module.exports = Like;