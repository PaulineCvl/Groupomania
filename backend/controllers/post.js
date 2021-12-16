const Post = require('../models/Post');
const Like = require('../models/Like');
const fs = require('fs');


exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    Post.sync({ alter: true })
        .then(() => {
            Post.create({
                ...postObject,
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            })
                .then(() => res.status(200).json({ message: 'post créé' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}

exports.getAllPosts = (req, res, next) => {
    Post.sync({ alter: true })
        .then(() => {
            Post.findAll({ order: [['updatedAt', 'DESC']] })
                .then(posts => res.status(200).json(posts))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}

exports.getOnePost = (req, res, next) => {
    Post.sync({ alter: true })
        .then(() => {
            Post.findOne({ where: { id: req.params.id } })
                .then(post => res.status(200).json(post))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => { res.status(500).json({ error }) });
}

exports.modifyPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);

    const postUpdated = req.file ?
        {
            ...postObject,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {
            ...postObject
        }

    const updatePost = () => {
        Post.sync({ alter: true })
            .then(() => {
                Post.findOne({ where: { id: req.params.id } })
                    .then(() => {
                        Post.update(postUpdated, { where: { id: req.params.id } })
                            .then(() => res.status(200).json({ message: 'post modifié' }))
                            .catch(error => res.status(400).json({ error }));
                    })
                    .catch(error => res.status(500).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
    }

    if (req.file) {
        Post.findOne({ where: { id: req.params.id } })
            .then(post => {
                const filename = post.imageUrl.split('/images')[1];
                fs.unlink(`images/${filename}`, () => {
                    updatePost();
                })
            })
            .catch(error => res.status(500).json({ error }));
    } else {
        updatePost();
    }
}

exports.deletePost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id } })
        .then(post => {
            const filename = post.imageUrl.split('/images')[1];
            fs.unlink(`images/${filename}`, () => {
                Post.destroy({ where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: 'post supprimé' }))
                    .catch(error => res.status(400).json({ error }));
            })
        })
}

Post.hasMany(Like);
Like.belongsTo(Post);

exports.sendLike = (req, res, next) => {
    /* const like = req.body.like;

    Like.sync({ alter: true })
        .then(() => {
            if(like == true) {
                Like.create({
                    like: 1
                })
                    .then(like => {
                        Post.findOne({ where: { id: req.params.id } })
                            .then(post => {
                                post.addLike(like)
                                    .then(() => res.status(200).json('post liké'))
                                    .catch(error => res.status(400).json({ error }));
                            })
                    })
            } else {
                Like.create({
                    like: -1
                })
                    .then(like => {
                        Post.findOne({ where: { id: req.params.id } })
                            .then(post => {
                                post.addLike(like)
                                    .then(() => res.status(200).json('post disliké'))
                                    .catch(error => res.status(400).json({ error }));
                            })
                    })
            }
        }) */
}