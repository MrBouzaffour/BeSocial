<template>
    <div class="user-profile">
      <h2>{{ user.name }} {{ user.lastname }}</h2>
      <p>Email: {{ user.email }}</p>
      <p>Joined: {{ new Date(user.date).toLocaleDateString() }}</p>
      <!-- Add more user information as needed -->
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    name: 'UserProfile',
    computed: {
      ...mapGetters(['profileUser']),
      user() {
        return this.profileUser;
      }
    },
    created() {
      const userId = this.$route.params.id;
      this.fetchUserProfile(userId);
    },
    methods: {
      ...mapActions(['fetchUserProfile']),
    }
  };
  </script>
  
  <style scoped>
  .user-profile {
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
  
  .user-profile h2 {
    margin-bottom: 20px;
    color: #5a3e36;
  }
  </style>
  