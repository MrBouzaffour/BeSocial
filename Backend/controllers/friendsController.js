const User = require('../models/User');
const FriendRequest = require('../models/FriendRequest');

exports.searchFriends = async (req, res) => {
  try {
    const { query } = req.query;
    const users = await User.find({ 
      $or: [
        { name: new RegExp(query, 'i') },
        { lastname: new RegExp(query, 'i') }
      ]
    }).select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.sendFriendRequest = async (req, res) => {
  try {
    const { recipientId } = req.body;
    const newRequest = new FriendRequest({
      requester: req.user.id,
      recipient: recipientId,
    });
    await newRequest.save();
    res.json(newRequest);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.acceptFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.body;
    const request = await FriendRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ msg: 'Friend request not found' });
    }
    request.status = 'accepted';
    await request.save();
    res.json(request);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
