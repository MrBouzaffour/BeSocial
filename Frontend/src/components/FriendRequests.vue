<template>
    <div>
      <h2>Friend Requests</h2>
      <h3>Incoming</h3>
      <ul>
        <li v-for="request in incomingRequests" :key="request._id">
          {{ request.name }} {{ request.lastname }}
          <button @click="acceptRequest(request._id)">Accept</button>
          <button @click="declineRequest(request._id)">Decline</button>
        </li>
      </ul>
      <h3>Outgoing</h3>
      <ul>
        <li v-for="request in outgoingRequests" :key="request._id">
          {{ request.name }} {{ request.lastname }}
        </li>
      </ul>
    </div>
</template>
  
<script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    computed: {
      ...mapGetters(['incomingRequests', 'outgoingRequests']),
    },
    created() {
      this.fetchFriendRequests();
    },
    methods: {
      ...mapActions(['fetchFriendRequests', 'acceptRequest', 'declineRequest']),
    },
  };
</script>
