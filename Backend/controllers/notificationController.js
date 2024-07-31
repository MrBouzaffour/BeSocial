const Notification = require('../models/Notification');

exports.createNotification = async (req, res) => {
  try {
    const { user, type, message } = req.body;
    const newNotification = new Notification({
      user,
      type,
      message,
      isRead: false,
    });
    await newNotification.save();
    res.json(newNotification);
  } catch (error) {
    console.error('Failed to create notification:', error);
    res.status(500).send('Server error');
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id }).sort({ date: -1 });
    res.json(notifications);
  } catch (error) {
    console.error('Failed to fetch notifications:', error);
    res.status(500).send('Server error');
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ msg: 'Notification not found' });
    }

    if (notification.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    notification.isRead = true;
    await notification.save();
    res.json(notification);
  } catch (error) {
    console.error('Failed to mark notification as read:', error);
    res.status(500).send('Server error');
  }
};
