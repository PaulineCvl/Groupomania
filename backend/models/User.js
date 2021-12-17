const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
require('dotenv').config();

const Comment = require('./Comment');

const Like = require('./Like');

const sequelize = new Sequelize('groupomaniatest', 'root', process.env.DB_CONNECT_SEQUELIZE, {
    dialect: 'mysql'
});

const User = sequelize.define('user', {
    email: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    admin: {type: DataTypes.BOOLEAN, defaultValue: false},
    profilePicture: {type: DataTypes.STRING},
    description: {type: DataTypes.TEXT}
},
{
    freezeTableName: true,
    timestamps: false
});

User.hasMany(Like, {onDelete: 'CASCADE'});
Like.belongsTo(User, {onDelete: 'CASCADE'});

User.hasMany(Comment, {onDelete: 'CASCADE'});
Comment.belongsTo(User, {onDelete: 'CASCADE'});

module.exports = User;