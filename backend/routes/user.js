const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer-config');

const userCtrl = require('../controllers/user');

router.post('/signup', multer, userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/:id', multer, userCtrl.modifyUser);
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;