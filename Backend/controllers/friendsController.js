const FriendRequest = require('../models/FriendRequest');
const User = require('../models/User');

exports.sendFriendRequest = async (req, res) => {
  try {
    const { friendId } = req.body;
    const userId = req.user.id;

    if (userId === friendId) {
      return res.status(400).json({ msg: 'You cannot send a friend request to yourself' });
    }

    const existingRequest = await FriendRequest.findOne({
      requester: userId,
      recipient: friendId,
    });

    if (existingRequest) {
      return res.status(400).json({ msg: 'Friend request already sent' });
    }

    const newRequest = new FriendRequest({
      requester: userId,
      recipient: friendId,
      status: 'pending',
    });

    await newRequest.save();
    res.json({ msg: 'Friend request sent' });
  } catch (error) {
    console.error('Failed to send friend request:', error);
    res.status(500).send('Server error');
  }
};

exports.acceptFriendRequest = async (req, res) => {
  const { requestId } = req.body;

  try {
    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ msg: 'Friend request not found' });
    }

    if (friendRequest.recipient.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    friendRequest.status = 'accepted';
    await friendRequest.save();
    res.json(friendRequest);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.rejectFriendRequest = async (req, res) => {
  const { requestId } = req.body;

  try {
    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ msg: 'Friend request not found' });
    }

    if (friendRequest.recipient.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await friendRequest.remove();
    res.json({ msg: 'Friend request rejected' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.checkFriendshipStatus = async (req, res) => {
  try {
    const { id: friendId } = req.params;
    const userId = req.user.id;

    const friendRequest = await FriendRequest.findOne({
      $or: [
        { requester: userId, recipient: friendId },
        { requester: friendId, recipient: userId }
      ]
    });

    if (friendRequest) {
      return res.json({ status: friendRequest.status });
    }

    res.json({ status: 'not_friends' });
  } catch (error) {
    console.error('Failed to check friendship status:', error);
    res.status(500).send('Server error');
  }
};

exports.searchFriends = async (req, res) => {
  try {
    const { query } = req.query;
    const users = await User.find({
      $or: [
        { name: new RegExp(query, 'i') },
        { lastname: new RegExp(query, 'i') }
      ]
    }).select('name lastname email');

    res.json(users);
  } catch (error) {
    console.error('Search failed:', error);
    res.status(500).send('Server error');
  }
};
