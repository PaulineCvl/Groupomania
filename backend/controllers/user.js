const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
require('dotenv').config();

exports.signup = (req, res, next) => {
    const user = req.body.user;
    const password = user.password;
    bcrypt.hash(password, 10)
        .then(hash => {
            const newUser = req.file ?
                {
                    ...user,
                    password: hash,
                    profilePicture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                } : {
                    ...user,
                    password: hash
                }

            User.create({
                ...newUser
            })
                .then(user => res.status(201).json(user))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}

exports.login = (req, res, next) => {
    const userLogged = req.body.user;

    User.findOne({ where: { email: userLogged.email } })
        .then(user => {
            bcrypt.compare(userLogged.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Utilisateur ou mot de passe incorrect' });
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user.id },
                            process.env.DB_SECRET_TOKEN,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(() => res.status(401).json({ error: 'Utilisateur ou mot de passe incorrect' }));
};

exports.findOneUser = (req, res, next) => {
    User.findOne({ where: { id: req.params.id } })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({ error }));
}

exports.modifyUser = (req, res, next) => {
    const userObject = req.body;
    const password = req.body.password;

    const updateUser = () => {
        if (password) {
            bcrypt.hash(password, 10)
                .then(hash => {
                    const userUpdated = req.file ?
                        {
                            ...userObject,
                            password: hash,
                            profilePicture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                        } : {
                            ...userObject,
                            password: hash
                        }

                    User.update(userUpdated, { where: { id: req.params.id } })
                        .then(() => res.status(201).json({ message: 'Utilisateur modifié' }))
                        .catch(error => res.status(400).json({ error }));
                })
                .catch(error => res.status(500).json({ error }));
        } else {
            const userUpdated = req.file ?
                {
                    ...userObject,
                    profilePicture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                } : {
                    ...userObject
                }
            User.update(userUpdated, { where: { id: req.params.id } })
                .then(() => res.status(201).json({ message: 'Utilisateur modifié' }))
                .catch(error => res.status(400).json({ error }));
        }
    }

    if (req.file) {
        User.findOne({ where: { id: req.params.id } })
            .then(user => {
                if (user.profilePicture) {
                    const filename = user.profilePicture.split('/images')[1];
                    fs.unlink(`images/${filename}`, () => {
                        updateUser();
                    })
                } else {
                    updateUser();
                }
            })
            .catch(error => res.status(404).json({ error }));
    } else {
        updateUser();
    }
}

exports.deleteUser = (req, res, next) => {
    if (req.file) {
        User.findOne({ where: { id: req.params.id } })
            .then(user => {
                const filename = user.profilePicture.split('/images')[1];
                fs.unlink(`images/${filename}`, () => {
                    User.destroy({ where: { id: req.params.id } })
                        .then(() => res.status(200).json({ message: 'Utilisateur supprimé' }))
                        .catch(error => res.status(400).json({ error }));
                })
            })
            .catch(error => res.status(404).json({ error }));
    } else {
        User.destroy({ where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: 'Utilisateur supprimé' }))
            .catch(error => res.status(400).json({ error }));
    }
}