<template>
    <div class="notification-dropdown">
      <button @click="toggleDropdown">Notifications ({{ unreadCount }})</button>
      <div v-if="dropdownOpen" class="notification-list">
        <ul>
          <li v-for="notification in notifications" :key="notification._id">
            <span :class="{ 'notification-unread': !notification.isRead }">
              {{ notification.message }}
            </span>
            <template v-if="notification.type === 'friend_request'">
              <button @click="acceptFriendRequest(notification._id, notification.sender)">Accept</button>
              <button @click="rejectFriendRequest(notification._id)">Reject</button>
            </template>
            <button @click="markAsRead(notification._id)">Mark as Read</button>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        dropdownOpen: false,
      };
    },
    computed: {
      ...mapState({
        notifications: state => state.notifications,
      }),
      unreadCount() {
        return this.notifications.filter(notification => !notification.isRead).length;
      },
    },
    methods: {
      ...mapActions(['fetchNotifications', 'markNotificationAsRead', 'acceptFriendRequest', 'rejectFriendRequest']),
      toggleDropdown() {
        this.dropdownOpen = !this.dropdownOpen;
        if (this.dropdownOpen) {
          this.fetchNotifications();
        }
      },
      markAsRead(notificationId) {
        this.markNotificationAsRead(notificationId);
      },
      acceptFriendRequest(notificationId, senderId) {
        this.$store.dispatch('acceptFriendRequest', { notificationId, senderId });
      },
      rejectFriendRequest(notificationId) {
        this.$store.dispatch('rejectFriendRequest', { notificationId });
      }
    },
    created() {
      this.fetchNotifications();
    },
  };
  </script>
  
  <style scoped>
  .notification-dropdown {
    position: relative;
  }
  
  .notification-list {
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    width: 300px;
    z-index: 100;
  }
  
  .notification-list ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .notification-list li {
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  
  .notification-list li:hover {
    background: #f9f9f9;
  }
  
  .notification-unread {
    font-weight: bold;
  }
  
  .notification-list button {
    margin-left: 10px;
  }
  </style>
  