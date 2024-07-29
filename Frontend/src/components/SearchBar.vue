<template>
    <div>
      <input v-model="query" placeholder="Search for friends..." />
      <button @click="search">Search</button>
      <ul>
        <li v-for="user in searchResults" :key="user._id">
          {{ user.name }} {{ user.lastname }}
          <button @click="sendRequest(user._id)">Send Request</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        query: '',
        searchResults: []
      };
    },
    methods: {
      ...mapActions(['searchUsers', 'sendFriendRequest']),
      async search() {
        this.searchResults = await this.searchUsers(this.query);
      },
      sendRequest(userId) {
        this.sendFriendRequest(userId);
      }
    }
  };
  </script>
  