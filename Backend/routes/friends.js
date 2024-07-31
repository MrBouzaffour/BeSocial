const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendsController');
const auth = require('../middleware/auth');

router.post('/request', auth, friendController.sendFriendRequest);
router.post('/accept', auth, friendController.acceptFriendRequest);
router.post('/reject', auth, friendController.rejectFriendRequest);
router.get('/status/:id', auth, friendController.checkFriendshipStatus);

module.exports = router;
