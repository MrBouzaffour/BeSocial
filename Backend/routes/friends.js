const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const friendController = require('../controllers/friendsController');

// Search for friends
router.get('/search', auth, friendController.searchFriends);

// Send friend request
router.post('/request', auth, friendController.sendFriendRequest);

// Accept friend request
router.post('/accept', auth, friendController.acceptFriendRequest);

module.exports = router;
