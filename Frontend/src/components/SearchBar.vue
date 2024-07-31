<template>
  <div class="search-bar-container">
    <input v-model="query" @input="search" placeholder="Search by name or last name" />
    <ul v-if="users.length" class="search-results">
      <li v-for="user in users" :key="user._id">
        <a @click="viewProfile(user._id)">{{ user.name }} {{ user.lastname }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from '../utils/axios';

export default {
  data() {
    return {
      query: '',
      users: []
    };
  },
  methods: {
    async search() {
      if (this.query.length > 2) {
        const response = await axios.get('/users/search', {
          params: { query: this.query }
        });
        this.users = response.data;
      } else {
        this.users = [];
      }
    },
    viewProfile(id) {
      this.$router.push(`/profile/${id}`);
    }
  }
};
</script>

<style scoped>
.search-bar-container {
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
}

.search-bar-container input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.search-results {
  position: absolute;
  width: 100%;
  background: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin-top: 5px;
  z-index: 10;
}

.search-results li {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}

.search-results li:last-child {
  border-bottom: none;
}

.search-results li:hover {
  background: #f2f2f2;
}
</style>