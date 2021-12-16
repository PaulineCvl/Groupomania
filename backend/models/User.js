const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
require('dotenv').config();

const sequelize = new Sequelize('groupomaniatest', 'root', process.env.DB_CONNECT_SEQUELIZE, {
    dialect: 'mysql'
});

const User = sequelize.define('user', {
    email: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    admin: {type: DataTypes.BOOLEAN, defaultValue: false}
},
{
    freezeTableName: true,
    timestamps: false
});

module.exports = User;