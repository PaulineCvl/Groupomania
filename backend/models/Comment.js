const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_DATABASE_NAME, process.env.DB_DATABASE_USERNAME, process.env.DB_DATABASE_PASSWORD, {
    dialect: 'mysql'
});

const Comment = sequelize.define('comment', {
    message: {type: DataTypes.TEXT},
    isReported: {type: DataTypes.BOOLEAN, defaultValue: false}
},
{
    freezeTableName: true,
});

module.exports = Comment;