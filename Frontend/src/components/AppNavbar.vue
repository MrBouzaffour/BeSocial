<template>
  <v-app-bar app color="primary" dark flat elevate-on-scroll>
    <v-app-bar-nav-icon @click="toggleDrawer" />

    <!-- Application Title -->
    <v-toolbar-title>My App</v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- Search Bar added directly in the navigation bar -->
    <div class="navbar-search-container">
      <SearchBar />
    </div>

    <v-spacer></v-spacer>

    <!-- Notification Button -->
    <v-btn icon @click="toggleNotifications">
      <v-icon>mdi-bell</v-icon>
    </v-btn>

    <!-- Notifications Menu -->
    <v-menu v-model="notificationMenu" bottom right offset-y transition="slide-y-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list dense>
        <v-subheader>Notifications</v-subheader>
        <v-divider></v-divider>
        <v-list-item
          v-for="(notification, index) in notifications"
          :key="index"
          @click="handleNotificationClick"
        >
          <v-list-item-avatar>
            <v-icon color="blue">mdi-information</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ notification.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ notification.subtitle }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click.stop="markAsRead(notification)">
              <v-icon color="grey lighten-1">mdi-check-circle</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-btn text color="primary" @click="viewAllNotifications">View all</v-btn>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- Profile and Settings Buttons -->
    <v-btn icon @click="openUserProfile">
      <v-icon>mdi-account-circle</v-icon>
    </v-btn>
    <v-btn icon @click="openSettings">
      <v-icon>mdi-settings</v-icon>
    </v-btn>
    <v-btn icon @click="handleLogout">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>


<script>
import SearchBar from '@/components/SearchBar';

export default {
  components: {
    SearchBar,
  },
  data() {
    return {
      drawer: false,
      notificationMenu: false,
      notifications: [
        { title: 'New Message', subtitle: 'You have a new message', read: false },
        { title: 'New Comment', subtitle: 'Someone commented on your post', read: false },
      ],
    };
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    toggleNotifications() {
      this.notificationMenu = !this.notificationMenu;
    },
    handleNotificationClick() {
      // Implement the logic for notification click here
    },
    markAsRead(notification) {
      notification.read = true;
    },
    viewAllNotifications() {
      // Navigate to a page with all notifications
    },
    openUserProfile() {
      // Logic to open user profile
    },
    openSettings() {
      // Logic to open settings
    },
    handleLogout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
  },
};
</script>


<style scoped>
.navbar-search-container {
  flex-grow: 1;
  max-width: 300px; /* Adjust width as needed */
}

.search-bar {
  width: 100%;
  margin-right: 16px; /* Space before the notification icon */
}
</style>
