const Post = require('../models/Post');
const Like = require('../models/Like');
const fs = require('fs');

exports.createPost = (req, res, next) => {
    Post.create({
        description: req.body.description,
        userId: req.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
        .then(() => res.status(201).json({ message: 'Post créé' }))
        .catch(error => res.status(400).json({ error }));
}

exports.getAllPosts = (req, res, next) => {
    Post.findAll({ order: [['updatedAt', 'DESC']] })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(404).json({ error }));
}

exports.getOnePost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id } })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({ error }));
}

exports.modifyPost = (req, res, next) => {
    const postUpdated = req.file ?
        {
            description: req.body.description,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {
            description: req.body.description
        }

    const updatePost = () => {
        Post.update(postUpdated, { where: { id: req.params.id } })
            .then(() => res.status(201).json({ message: 'Post modifié' }))
            .catch(error => res.status(400).json({ error }));
    }

    if (req.file) {
        Post.findOne({ where: { id: req.params.id } })
            .then(post => {
                if (post.imageUrl) {
                    const filename = post.imageUrl.split('/images')[1];
                    fs.unlink(`images/${filename}`, () => {
                        updatePost();
                    })
                } else {
                    updatePost();
                }
            })
            .catch(error => res.status(404).json({ error }));
    } else {
        updatePost();
    }
}

exports.deletePost = (req, res, next) => {
    if (req.file) {
        Post.findOne({ where: { id: req.params.id } })
            .then(post => {
                const filename = post.imageUrl.split('/images')[1];
                fs.unlink(`images/${filename}`, () => {
                    Post.destroy({ where: { id: req.params.id } })
                        .then(() => res.status(200).json({ message: 'Post supprimé' }))
                        .catch(error => res.status(400).json({ error }));
                })
            })
            .catch(error => res.status(404).json({ error }));
    } else {
        Post.destroy({ where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: 'Post supprimé' }))
            .catch(error => res.status(400).json({ error }));
    }
}

exports.sendLike = (req, res, next) => {
    Like.findAll({ where: { postId: req.params.id } })
        .then(likes => {
            let count = undefined;
            if (likes.length > 0) {
                likes.forEach(element => {
                    if (element.userId == req.userId) {
                        count = element;
                    }
                })

                if (count) {
                    Like.destroy({ where: { id: count.id } })
                        .then(() => res.status(200).json({ message: 'Like supprimé' }))
                        .catch(error => res.status(400).json({ error }));
                } else {
                    Like.create({
                        like: 1,
                        postId: req.params.id,
                        userId: req.userId
                    })
                        .then(() => res.status(201).json({ message: 'Post liké' }))
                        .catch(error => res.status(400).json({ error }));
                }
            } else {
                Like.create({
                    like: 1,
                    postId: req.params.id,
                    userId: req.userId
                })
                    .then(() => res.status(201).json({ message: 'Post liké' }))
                    .catch(error => res.status(400).json({ error }));
            }
        })
        .catch(error => {
            console.log(error);
            res.status(404).json({ error })
        });
}

exports.getAllLikes = (req, res, next) => {
    Like.findAll({ where: { postId: req.params.id } })
        .then(likes => { res.status(200).json(likes) })
        .catch(error => res.status(404).json({ error }));
}

/* exports.getAllLikes = (req, res, next) => {
    Like.findAll({ where: { postId: req.params.id } })
        .then(likes => { 
            User.findOne({where: {id: req.body.userId}})
            .then(() => {
                likes.push({userHasLiked: likes.map(currentLike => {
                    return currentLike.userId
                }).includes(user.id)})
            })
        })
        .catch(error => res.status(404).json({ error }));
} */