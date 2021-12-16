const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comment');

router.post('/:id/comment', auth, commentCtrl.createComment);
router.get('/:id/comment', auth, commentCtrl.getAllComments);
router.get('/:id/comment/:id', auth, commentCtrl.getOneComment);
router.put('/:id/comment/:id', auth, commentCtrl.modifyComment);
router.delete('/:id/comment/:id', auth, commentCtrl.deleteComment);

module.exports = router;