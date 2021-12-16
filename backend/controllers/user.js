const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            User.sync({ alter: true }).then(() => {
                User.create({
                    email: req.body.email,
                    password: hash
                })
                    .then(() => res.status(200).json({ message: "Utilisateur créé" }))
                    .catch(error => res.status(400).json({ error }));
            })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(400).json({ error }));
}

exports.login = (req, res, next) => {
    User.sync({ alter: true })
        .then(() => {
            User.findOne({ where: { email: req.body.email } })
                .then(user => {
                    bcrypt.compare(req.body.password, user.password)
                        .then(valid => {
                            if (!valid) {
                                return res.status(401).json({ error: 'Mot de passe incorrect' });
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
                .catch(error => res.status(401).json({ error: "Utilisateur non trouvé" }));
        })
        .catch(error => res.status(500).json({ error }));
};