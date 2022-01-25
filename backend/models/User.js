const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
require('dotenv').config();

const Comment = require('./Comment');
const Like = require('./Like');
const Post = require('./Post');

const sequelize = new Sequelize('groupomania', 'root', process.env.DB_CONNECT_SEQUELIZE, {
    dialect: 'mysql'
});

const User = sequelize.define('user', {
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
    admin: {type: DataTypes.BOOLEAN, defaultValue: false},
    firstName: {type: DataTypes.STRING},
    lastName: {type: DataTypes.STRING},
    profilePicture: {type: DataTypes.STRING, defaultValue: null},
    description: {type: DataTypes.TEXT, defaultValue: null}
},
{
    freezeTableName: true,
    timestamps: false
});

User.hasMany(Like, {onDelete: 'CASCADE'});
Like.belongsTo(User, {onDelete: 'CASCADE'});

User.hasMany(Comment, {onDelete: 'CASCADE'});
Comment.belongsTo(User, {onDelete: 'CASCADE'});

User.hasMany(Post, {onDelete: 'CASCADE'});
Post.belongsTo(User, {onDelete: 'CASCADE'});

module.exports = User;