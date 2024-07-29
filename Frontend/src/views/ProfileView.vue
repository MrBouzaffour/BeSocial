<template>
    <div class="profile-page">
      <h2>{{ user.name }} {{ user.lastname }}</h2>
      <p>Joined on: {{ new Date(user.date).toLocaleDateString() }}</p>
      <!-- Add more user details here -->
    </div>
  </template>
  
  <script>
  import axios from '../utils/axios';
  
  export default {
    data() {
      return {
        user: {}
      };
    },
    async created() {
      const userId = this.$route.params.id;
      const response = await axios.get(`/users/${userId}`);
      this.user = response.data;
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
  