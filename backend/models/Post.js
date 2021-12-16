const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
require('dotenv').config();

const sequelize = new Sequelize('groupomaniatest', 'root', process.env.DB_CONNECT_SEQUELIZE, {
    dialect: 'mysql'
});

const Post = sequelize.define('post', {
    description: {type: DataTypes.TEXT},
    imageUrl: {type: DataTypes.STRING}
},
{
    freezeTableName: true,
});

module.exports = Post;