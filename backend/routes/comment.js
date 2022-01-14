const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comment');

router.post('/posts/:id/comment', auth, commentCtrl.createComment);
router.get('/posts/:id/comment', auth, commentCtrl.getAllComments);
router.get('/posts/:id/comment/:id', auth, commentCtrl.getOneComment);
router.get('/comment', auth, commentCtrl.getReportedComments);
router.put('/posts/:id/comment/:id', auth, commentCtrl.modifyComment);
router.delete('/posts/:id/comment/:id', auth, commentCtrl.deleteComment);

module.exports = router;