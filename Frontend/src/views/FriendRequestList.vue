// src/views/FriendRequestList.vue
<template>
  <div class="friend-request-list">
    <h2>Friend Requests</h2>
    <ul>
      <li v-for="request in friendRequests" :key="request._id">
        <p>{{ request.requester.name }} {{ request.requester.lastname }} has sent you a friend request</p>
        <button @click="acceptRequest(request._id)">Accept</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState({
      friendRequests: state => state.friendRequests
    })
  },
  methods: {
    ...mapActions(['acceptFriendRequest']),
    acceptRequest(requestId) {
      this.acceptFriendRequest(requestId);
    }
  },
  created() {
    this.$store.dispatch('fetchFriendRequests');
  }
};
</script>

<style scoped>
.friend-request-list {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
}

.friend-request-list ul {
  list-style: none;
  padding: 0;
}

.friend-request-list li {
  margin: 10px 0;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.friend-request-list button {
  background-color: #ffeb99;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.friend-request-list button:hover {
  background-color: #e6b347;
}
</style>
