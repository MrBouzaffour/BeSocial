<template>
  <div class="feed-page">
    <div class="sidebar">
      <ul class="nav-list">
        <li :class="{ active: activeTab === 'feed' }" @click="setActiveTab('feed')">Feed</li>
        <li :class="{ active: activeTab === 'chat' }" @click="setActiveTab('chat')">Chat</li>
        <li :class="{ active: activeTab === 'todo' }" @click="setActiveTab('todo')">To-Do List</li>
        <li :class="{ active: activeTab === 'study' }" @click="setActiveTab('study')">Study Tools</li>
        <li :class="{ active: activeTab === 'finance' }" @click="setActiveTab('finance')">Financial Help</li>
        <li @click="logout">Logout</li>
      </ul>
    </div>
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

export default {
  name: 'FeedView',
  data() {
    return {
      activeTab: 'feed',
    };
  },
  components: {
    UserFeed,
    UserChat,
    UserToDoList,
    UserStudyTools,
    UserFinancialHelp,
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
    },
  },
  beforeCreate() {
    if (!this.isAuthenticated) {
      this.$router.push('/login');
    }
  },
};
</script>

<style scoped>
.feed-page {
  display: flex;
  height: 100vh;
  background-color: #f2f2f2;
  font-family: 'Arial', sans-serif;
}

.sidebar {
  width: 20%;
  background-color: #ffeb99; /* Honey-like background color */
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-right: 2px solid #ffcc66; /* Darker honey border */
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

.nav-list li {
  padding: 15px;
  margin-bottom: 10px;
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

.main-content {
  width: 80%;
  padding: 20px;
  overflow-y: auto;
}
</style>
