const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
require('dotenv').config();

const Like = require('./Like');
const Comment = require('./Comment');

const sequelize = new Sequelize(process.env.DB_DATABASE_NAME, process.env.DB_DATABASE_USERNAME, process.env.DB_DATABASE_PASSWORD, {
    dialect: 'mysql'
});

const Post = sequelize.define('post', {
    description: {type: DataTypes.TEXT},
    imageUrl: {type: DataTypes.STRING}
},
{
    freezeTableName: true,
});

Post.hasMany(Like, {onDelete: 'CASCADE'});
Like.belongsTo(Post, {onDelete: 'CASCADE'});

Post.hasMany(Comment, {onDelete: 'CASCADE'});
Comment.belongsTo(Post, {onDelete: 'CASCADE'});

sequelize.sync();

module.exports = Post;