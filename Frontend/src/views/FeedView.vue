<template>
  <div class="feed-page">
    <div class="header">
      <input
        v-model="searchQuery"
        @input="searchFriends"
        type="text"
        placeholder="Search friends by name or lastname"
      />
    </div>
    <div class="content">
      <div class="sidebar">
        <ul class="nav-list">
          <li :class="{ active: activeTab === 'feed' }" @click="setActiveTab('feed')">Feed</li>
          <li :class="{ active: activeTab === 'chat' }" @click="setActiveTab('chat')">Chat</li>
          <li :class="{ active: activeTab === 'todo' }" @click="setActiveTab('todo')">To-Do List</li>
          <li :class="{ active: activeTab === 'study' }" @click="setActiveTab('study')">Study Tools</li>
          <li :class="{ active: activeTab === 'finance' }" @click="setActiveTab('finance')">Financial Help</li>
          <li :class="{ active: activeTab === 'friends' }" @click="setActiveTab('friends')">Friends</li>
          <li @click="handleLogout">Logout</li>
        </ul>
      </div>
      <div class="main-content">
        <component :is="activeComponent"></component>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import UserFeed from "../components/UserFeed.vue";
import UserChat from "../components/UserChat.vue";
import UserToDoList from "../components/UserToDoList.vue";
import UserStudyTools from "../components/UserStudyTools.vue";
import UserFinancialHelp from "../components/UserFinancialHelp.vue";
import FriendList from "../components/FriendList.vue";

export default {
  name: "FeedView",
  data() {
    return {
      activeTab: "feed",
      searchQuery: ""
    };
  },
  components: {
    UserFeed,
    UserChat,
    UserToDoList,
    UserStudyTools,
    UserFinancialHelp,
    FriendList
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
    activeComponent() {
      return {
        feed: UserFeed,
        chat: UserChat,
        todo: UserToDoList,
        study: UserStudyTools,
        finance: UserFinancialHelp,
        friends: FriendList
      }[this.activeTab];
    }
  },
  methods: {
    ...mapActions(["logout", "searchFriends"]),
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    handleLogout() {
      this.logout();
      this.$router.push('/login');
    },
    async searchFriends() {
      if (this.searchQuery.trim()) {
        await this.$store.dispatch('searchFriends', this.searchQuery);
        this.setActiveTab('friends'); // Show friends tab with search results
      }
    }
  },
  created() {
    console.log("Checking authentication in FeedView"); // Debug: log authentication check
    if (!this.isAuthenticated) {
      console.log("Not authenticated, redirecting to login"); // Debug: log redirection
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.feed-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f9f9f9;
  font-family: 'Arial', sans-serif;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}

.header input {
  padding: 10px;
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  margin-right: 10px;
}

.content {
  display: flex;
  flex: 1;
}

.sidebar {
  width: 20%;
  background-color: #fff;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
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
  background-color: #ffcc66;
  color: white;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.nav-list li.active,
.nav-list li:hover {
  background-color: #e6b347;
}

.main-content {
  width: 80%;
  padding: 20px;
  overflow-y: auto;
}
</style>
