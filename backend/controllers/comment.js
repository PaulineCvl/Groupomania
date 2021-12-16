const Comment = require('../models/Comment');
const Post = require('../models/Post');

Post.hasMany(Comment, {onDelete: 'CASCADE'});
Comment.belongsTo(Post, {onDelete: 'CASCADE'});

exports.createComment = (req, res, next) => {
    Comment.sync({ alter: true })
        .then(() => {
            Comment.create({
                message: req.body.message
            })
                .then(comment => {
                    Post.findOne({ where: { id: req.params.id } })
                        .then(post => {
                            post.addComment(comment)
                                .then(() => res.status(200).json({ message: 'commentaire ajouté' }))
                                .catch(error => res.status(400).json({ error }));
                        })
                        .catch(error => res.status(400).json({ error }));
                })
                .catch(error => res.status(500).json({ error }));

        })
        .catch(error => res.status(500).json({ error }));
}

exports.getAllComments = (req, res, next) => {
    Comment.sync({ alter: true })
        .then(() => {
            Comment.findAll({ where: { postId: req.params.id } })
                .then(comments => { res.status(200).json(comments) })
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}

exports.getOneComment = (req, res, next) => {
    Comment.sync({ alter: true })
        .then(() => {
            Comment.findOne({ where: { id: req.params.id } })
                .then(comment => res.status(200).json(comment))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}

exports.modifyComment = (req, res, next) => {
    Comment.sync({ alter: true })
        .then(() => {
            const commentUpdated = req.body;

            Comment.update(commentUpdated, { where: { id: req.params.id } })
                .then(() => res.status(200).json({ message: 'commentaire modifié' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}

exports.deleteComment = (req, res, next) => {
    Comment.sync({ alter: true })
        .then(() => {
            Comment.destroy({ where: { id: req.params.id } })
                .then(() => res.status(200).json({ message: 'commentaire supprimé' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}