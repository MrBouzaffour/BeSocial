const FriendRequest = require('../models/friendModel');
const User = require('../models/userModel');
const { ValidationError } = require('../utils/errorHandler');
const { db } = require('../firebaseAdmin'); 

class FriendController {
    /**
     * @description Sends a friend request from the authenticated user to the specified receiver.
     * @param {Object} req - Express request object, expects `receiverId` in body.
     * @param {Object} res - Express response object.
     * @param {Function} next - Express next middleware function.
     * @returns {Object} JSON with success message and request details.
     */
    static async sendFriendRequest(req, res, next) {
        const { receiverId } = req.body;
        const senderId = req.user.uid;

        if (!receiverId) {
            return res.status(400).json({ error: 'Receiver ID is required' });
        }

        try {
            const request = await FriendRequest.sendRequest(senderId, receiverId);
            await User.addFriendRequest(senderId, { requestId: request.id, status: 'sent' });
            await User.addFriendRequest(receiverId, { requestId: request.id, status: 'received' });

            res.status(201).json({ message: 'Friend request sent', request });
        } catch (error) {
            next(error);
        }
    }

    /**
     * @description Handles a friend request by accepting or rejecting it.
     * @param {Object} req - Express request object, expects `requestId` in params and `action` in body.
     * @param {Object} res - Express response object.
     * @param {Function} next - Express next middleware function.
     * @returns {Object} JSON with success message based on the action taken.
     */
    static async handleFriendRequest(req, res, next) {
        const { requestId } = req.params;
        const { action } = req.body;

        try {
            const request = await FriendRequest.getRequestById(requestId);
            const senderId = request.senderId;
            const receiverId = request.receiverId;
        
            if (action === 'accept') {
                await User.addFriend(senderId, receiverId);
                await FriendRequest.updateRequestStatus(requestId, 'accepted');
                res.status(200).json({ message: 'Friend request accepted' });
            } else if (action === 'reject') {
                await FriendRequest.updateRequestStatus(requestId, 'rejected');
                res.status(200).json({ message: 'Friend request rejected' });
            } else {
                return res.status(400).json({ error: 'Invalid action' });
            }

            // Remove the friend request from both users' friendRequests lists
            await User.removeFriendRequest(senderId, requestId);
            await User.removeFriendRequest(receiverId, requestId);

            // After handling, delete the request
            await FriendRequest.deleteRequest(requestId);
        } catch (error) {
            next(error);
        }
    }

    /**
     * @description Retrieves all pending friend requests for the authenticated user.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {Function} next - Express next middleware function.
     * @returns {Object} JSON with an array of friend requests.
     */
    static async getFriendRequests(req, res, next) {
        const userId = req.user.uid;

        try {
            const snapshot = await db.collection('friendRequests')
                .where('receiverId', '==', userId)
                .where('status', '==', 'pending')
                .get();

            const requests = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            res.status(200).json(requests);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = FriendController;
