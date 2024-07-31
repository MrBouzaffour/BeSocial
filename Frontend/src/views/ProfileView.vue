<template>
  <div class="profile-page">
    <h2>{{ user.name }} {{ user.lastname }}</h2>
    <p>Joined on: {{ new Date(user.date).toLocaleDateString() }}</p>
    <button v-if="user._id !== currentUser._id" @click="sendFriendRequest(user._id)" :disabled="friendStatus !== 'not_friends'">
      {{ friendButtonText }}
    </button>
    <p v-if="friendStatus === 'pending'">Friend request pending</p>
    <p v-if="friendStatus === 'friends'">You are friends</p>
  </div>
</template>

<script>
import axios from '../utils/axios';
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      user: {},
      friendStatus: 'not_friends'
    };
  },
  computed: {
    ...mapState({
      currentUser: state => state.user
    }),
    friendButtonText() {
      switch (this.friendStatus) {
        case 'friends':
          return 'Friends';
        case 'pending':
          return 'Pending';
        default:
          return 'Add Friend';
      }
    }
  },
  methods: {
    ...mapActions(['fetchUserProfile', 'sendFriendRequest']),
    async loadUser() {
      const userId = this.$route.params.id;
      await this.fetchUserProfile(userId);
      this.user = this.$store.state.profileUser;
      await this.checkFriendshipStatus();
    },
    async checkFriendshipStatus() {
      const userId = this.$route.params.id;
      try {
        const response = await axios.get(`/friends/status/${userId}`);
        this.friendStatus = response.data.status;
      } catch (error) {
        console.error('Failed to check friendship status:', error);
      }
    },
    async sendFriendRequest(friendId) {
      try {
        await this.$store.dispatch('sendFriendRequest', friendId);
        this.friendStatus = 'pending';
      } catch (error) {
        console.error('Failed to send friend request:', error);
      }
    }
  },
  async created() {
    await this.loadUser();
  }
};
</script>

<style scoped>
.profile-page {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
}
</style>
