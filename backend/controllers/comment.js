const Comment = require('../models/Comment');

exports.createComment = (req, res, next) => {
    Comment.create({
        message: req.body.message,
        postId: req.params.id,
        userId: req.userId
    })
        .then(() => res.status(201).json({ message: 'Commentaire ajouté' }))
        .catch(error => res.status(400).json({ error }));
}

exports.getAllComments = (req, res, next) => {
    Comment.findAll({ where: { postId: req.params.id } })
        .then(comments => { res.status(200).json(comments) })
        .catch(error => res.status(404).json({ error }));
}

exports.getOneComment = (req, res, next) => {
    Comment.findOne({ where: { id: req.params.id } })
        .then(comment => res.status(200).json(comment))
        .catch(error => res.status(404).json({ error }));
}

exports.modifyComment = (req, res, next) => {
    const commentUpdated = req.body;

    Comment.update(commentUpdated, { where: { id: req.params.id } })
        .then(() => res.status(201).json({ message: 'Commentaire modifié' }))
        .catch(error => res.status(400).json({ error }));
}

exports.deleteComment = (req, res, next) => {
    Comment.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Commentaire supprimé' }))
        .catch(error => res.status(400).json({ error }));
}