<template>
  <div class="feed-page">
    <header class="navbar">
      <div class="navbar-brand">My App</div>
      <div class="navbar-search">
        <SearchBar /> <!-- Include the search bar -->
      </div>
      <nav class="navbar-nav" :class="{ open: navOpen }">
        <ul class="nav-list">
          <li :class="{ active: activeTab === 'feed' }" @click="setActiveTab('feed')">Feed</li>
          <li :class="{ active: activeTab === 'chat' }" @click="setActiveTab('chat')">Chat</li>
          <li :class="{ active: activeTab === 'todo' }" @click="setActiveTab('todo')">To-Do List</li>
          <li :class="{ active: activeTab === 'study' }" @click="setActiveTab('study')">Study Tools</li>
          <li :class="{ active: activeTab === 'finance' }" @click="setActiveTab('finance')">Financial Help</li>
          <li @click="handleLogout">Logout</li>
        </ul>
      </nav>
      <div class="navbar-toggle" @click="toggleNav">
        &#9776;
      </div>
    </header>
    <div class="main-content">
      <component :is="activeComponent"></component>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import UserFeed from '../components/UserFeed.vue';
import UserChat from '../components/UserChat.vue';
import UserToDoList from '../components/UserToDoList.vue';
import UserStudyTools from '../components/UserStudyTools.vue';
import UserFinancialHelp from '../components/UserFinancialHelp.vue';
import SearchBar from '../components/SearchBar.vue';

export default {
  name: 'FeedView',
  data() {
    return {
      activeTab: 'feed',
      navOpen: false,
    };
  },
  components: {
    UserFeed,
    UserChat,
    UserToDoList,
    UserStudyTools,
    UserFinancialHelp,
    SearchBar,
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
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
    setActiveTab(tab) {
      this.activeTab = tab;
      this.navOpen = false; // Close nav on tab select
    },
    handleLogout() {
      this.logout();
      this.$router.push('/login');
    },
    toggleNav() {
      this.navOpen = !this.navOpen;
    },
  },
  created() {
    if (!this.isAuthenticated) {
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
  background-color: #f2f2f2;
  font-family: 'Arial', sans-serif;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffeb99; /* Honey-like background color */
  padding: 10px 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
}

.navbar-brand {
  font-size: 1.5em;
  font-weight: bold;
  color: #333;
}

.navbar-search {
  flex: 1;
  margin: 0 20px;
}

.navbar-nav {
  display: flex;
  align-items: center;
}

.nav-list {
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
}

.nav-list li {
  padding: 10px 15px;
  margin: 0 5px;
  background-color: #ffcc66; /* Darker honey color */
  color: white;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.nav-list li.active,
.nav-list li:hover {
  background-color: #e6b347; /* Even darker honey color for active and hover */
}

.navbar-toggle {
  display: none;
  font-size: 1.5em;
  cursor: pointer;
}

.main-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

/* Responsive Design */
@media (max-width: 768px) {
  .navbar-search {
    display: none;
  }

  .navbar-toggle {
    display: block;
  }

  .navbar-nav {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 60px;
    right: 0;
    background-color: #ffeb99;
    width: 100%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }

  .navbar-nav.open {
    display: flex;
  }

  .nav-list {
    flex-direction: column;
    width: 100%;
  }

  .nav-list li {
    margin: 5px 0;
  }
}
</style>
