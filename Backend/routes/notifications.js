const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const notificationsController = require('../controllers/notificationController');

// Create a notification
router.post('/', auth, notificationsController.createNotification);

// Get all notifications for the logged-in user
router.get('/', auth, notificationsController.getNotifications);

// Mark a notification as read
router.put('/:id', auth, notificationsController.markAsRead);

module.exports = router;
