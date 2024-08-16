import { createStore } from 'vuex';
import axios from '../utils/axios';
//import { toast } from 'vue-toastification';

export default createStore({
  state: {
    posts: [],
    user: JSON.parse(localStorage.getItem('user')) || null,
    searchResults: [],
    profileUser: null,
    notifications: []
  },

  mutations: {
    SET_POSTS(state, posts) {
      state.posts = posts;
    },
    ADD_POST(state, post) {
      state.posts.unshift(post);
    },
    ADD_LIKE(state, { postId, likes }) {
      const post = state.posts.find(p => p._id === postId);
      if (post) {
        post.likes = likes;
      }
    },
    REMOVE_LIKE(state, { postId, likes }) {
      const post = state.posts.find(p => p._id === postId);
      if (post) {
        post.likes = likes;
      }
    },
    DELETE_POST(state, postId) {
      state.posts = state.posts.filter(post => post._id !== postId);
    },
    ADD_COMMENT(state, { postId, comments }) {
      const post = state.posts.find(p => p._id === postId);
      if (post) {
        post.comments = comments;
      }
    },
    DELETE_COMMENT(state, { postId, comments }) {
      const post = state.posts.find(p => p._id === postId);
      if (post) {
        post.comments = comments;
      }
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_SEARCH_RESULTS(state, results) {
      state.searchResults = results;
    },
    SET_PROFILE_USER(state, user) {
      state.profileUser = user;
    },
    SET_NOTIFICATIONS(state, notifications) {
      state.notifications = notifications;
    },
    MARK_AS_READ(state, notificationId) {
      const notification = state.notifications.find(n => n._id === notificationId);
      if (notification) {
        notification.isRead = true;
      }
    },
    ADD_NOTIFICATION(state, notification) {
      state.notifications.unshift(notification);
    },
    ACCEPT_FRIEND_REQUEST(state, requestId) {
      const requestIndex = state.notifications.findIndex(notification => notification._id === requestId);
      if (requestIndex !== -1) {
        state.notifications.splice(requestIndex, 1);
      }
    },
    REJECT_FRIEND_REQUEST(state, requestId) {
      const requestIndex = state.notifications.findIndex(notification => notification._id === requestId);
      if (requestIndex !== -1) {
        state.notifications.splice(requestIndex, 1);
      }
    }
  },
  actions: {
    async fetchPosts({ commit }) {
      const response = await axios.get('/posts');
      commit('SET_POSTS', response.data);
    },
    async addPost({ commit }, postData) {
      const response = await axios.post('/posts', postData);
      commit('ADD_POST', response.data);
    },
    async addLike({ commit }, postId) {
      const response = await axios.put(`/posts/like/${postId}`);
      commit('ADD_LIKE', { postId, likes: response.data });
    },
    async removeLike({ commit }, postId) {
      const response = await axios.put(`/posts/unlike/${postId}`);
      commit('REMOVE_LIKE', { postId, likes: response.data });
    },
    async deletePost({ commit }, postId) {
      try {
        const response = await axios.delete(`/posts/${postId}`);
        if (response.status === 200 && response.data.msg === 'Post removed') {
          commit('DELETE_POST', postId);
          return response.data;  // Ensure you return the response data here
        } else {
          throw new Error('Unexpected server response');
        }
      } catch (error) {
        console.error('Delete post failed:', error);
        throw error;  // Re-throw the error so it can be caught in the component
      }
    },
    async addComment({ commit }, { postId, text }) {
      const response = await axios.post(`/posts/comment/${postId}`, { text });
      commit('ADD_COMMENT', { postId, comments: response.data });
    },
    async deleteComment({ commit }, { postId, commentId }) {
      const response = await axios.delete(`/posts/comment/${postId}/${commentId}`);
      commit('DELETE_COMMENT', { postId, comments: response.data });
    },
    async login({ commit }, token) {
      localStorage.setItem('token', token);
      axios.defaults.headers.common['x-auth-token'] = token;

      try {
        const response = await axios.get('/auth');
        commit('SET_USER', response.data);
      } catch (error) {
        commit('SET_USER', null);
      }
    },
    async logout({ commit }) {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['x-auth-token'];
      commit('SET_USER', null);
    },
    async searchFriends({ commit }, query) {
      try {
        const response = await axios.get(`/friends/search?query=${query}`);
        commit('SET_SEARCH_RESULTS', response.data);
      } catch (error) {
        console.error('Search failed:', error);
      }
    },
    async sendFriendRequest({ commit }, friendId) {
      try {
        await axios.post('/friends/request', { friendId });
        // Trigger notification
        const response = await axios.post('/notifications', {
          user: friendId,
          type: 'friend_request',
          message: 'You have a new friend request'
        });
        commit('ADD_NOTIFICATION', response.data);
      } catch (error) {
        console.error('Failed to send friend request:', error);
      }
    },
    async fetchUserProfile({ commit }, userId) {
      try {
        const response = await axios.get(`/users/${userId}`);
        commit('SET_PROFILE_USER', response.data);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    },
    async fetchNotifications({ commit }) {
      try {
        const response = await axios.get('/notifications');
        commit('SET_NOTIFICATIONS', response.data);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    },
    async markNotificationAsRead({ commit }, notificationId) {
      try {
        await axios.put(`/notifications/${notificationId}`);
        commit('MARK_AS_READ', notificationId);
      } catch (error) {
        console.error('Failed to mark notification as read:', error);
      }
    },
    async acceptFriendRequest({ commit }, notificationId) {
      try {
        await axios.post('/friends/accept', { requestId: notificationId });
        commit('ACCEPT_FRIEND_REQUEST', notificationId);
        // Add sender to friends list (if you have such logic)
      } catch (error) {
        console.error('Failed to accept friend request:', error);
      }
    },
    async rejectFriendRequest({ commit }, notificationId) {
      try {
        await axios.post('/friends/reject', { requestId: notificationId });
        commit('REJECT_FRIEND_REQUEST', notificationId);
      } catch (error) {
        console.error('Failed to reject friend request:', error);
      }
    }
  },
  getters: {
    isAuthenticated: state => !!state.user,
    allPosts: state => state.posts,
    searchResults: state => state.searchResults,
    profileUser: state => state.profileUser,
    notifications: state => state.notifications,
  },
  modules: {}
});
