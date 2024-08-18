<template>
  <div class="friend-request-list">
    <h2>Friend Requests</h2>
    <v-list dense>
      <v-list-item
        v-for="request in friendRequests"
        :key="request._id"
        class="friend-request-item"
      >
        <v-list-item-content>
          <v-list-item-title>
            {{ request.requester.name }} {{ request.requester.lastname }} has sent you a friend request
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn color="green" @click="acceptRequest(request._id)">Accept</v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
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

.friend-request-item {
  border-bottom: 1px solid #ddd;
  padding: 10px;
}
</style>
