const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_DATABASE_NAME, process.env.DB_DATABASE_USERNAME, process.env.DB_DATABASE_PASSWORD, {
    dialect: 'mysql'
});

const Like = sequelize.define('like', {
    like: {type: DataTypes.INTEGER}
},
{
    timestamps: false,
    freezeTableName: true,
});

sequelize.sync();

module.exports = Like;