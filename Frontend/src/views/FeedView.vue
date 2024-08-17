<template>
  <v-app class="feed-page">
    <!-- Navbar -->
    <v-app-bar app color="primary" dark flat>
      <v-app-bar-nav-icon @click="toggleDrawer" />
      <v-toolbar-title>My App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="toggleNotifications">
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-menu v-model="notificationMenu" bottom right offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(notification, index) in notifications" :key="index">
            <v-list-item-title>{{ notification.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ notification.subtitle }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list dense>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          @click="setActiveTab(item.tab)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content Area -->
    <v-main>
      <v-container class="main-content" fluid>
        <!-- Dynamic Component based on active tab -->
        <component :is="activeComponent"></component>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import { mapActions } from 'vuex';
import UserFeed from '../components/UserFeed.vue';
import UserChat from '../components/UserChat.vue';
import UserToDoList from '../components/UserToDoList.vue';
import UserStudyTools from '../components/UserStudyTools.vue';
import UserFinancialHelp from '../components/UserFinancialHelp.vue';

export default {
  name: 'FeedView',
  components: {
    UserFeed,
    UserChat,
    UserToDoList,
    UserStudyTools,
    UserFinancialHelp,
  },
  data() {
    return {
      activeTab: 'feed',
      drawer: false,
      notificationMenu: false,
      notifications: [
        { title: 'New Message', subtitle: 'You have a new message' },
        { title: 'New Comment', subtitle: 'Someone commented on your post' },
      ],
      menuItems: [
        { title: 'Feed', icon: 'mdi-view-dashboard', tab: 'feed' },
        { title: 'Chat', icon: 'mdi-chat', tab: 'chat' },
        { title: 'To-Do List', icon: 'mdi-checkbox-marked-circle-outline', tab: 'todo' },
        { title: 'Study Tools', icon: 'mdi-book-open-variant', tab: 'study' },
        { title: 'Financial Help', icon: 'mdi-cash', tab: 'finance' },
      ],
    };
  },
  computed: {
    activeComponent() {
      return {
        feed: UserFeed,
        chat: UserChat,
        todo: UserToDoList,
        study: UserStudyTools,
        finance: UserFinancialHelp,
      }[this.activeTab];
    },
  },
  methods: {
    ...mapActions(['logout']),
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    toggleNotifications() {
      this.notificationMenu = !this.notificationMenu;
    },
    setActiveTab(tab) {
      this.activeTab = tab;
      this.drawer = false; // Close drawer on tab select
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    }
  },
  created() {
    if (!this.$store.getters.isAuthenticated) {
      this.$router.push('/login');
    }
  },
};
</script>

<style scoped>
.feed-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-content {
  padding: 20px;
}
</style>
