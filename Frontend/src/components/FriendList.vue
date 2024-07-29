<template>
  <div>
    <input v-model="query" @input="search" placeholder="Search by name or last name" />
    <ul>
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
.friend-list {
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.friend-list h3 {
  margin-bottom: 20px;
  color: #5a3e36;
}

.friend-list ul {
  list-style: none;
  padding: 0;
}

.friend-list li {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.friend-list .friend-info {
  display: flex;
  flex-direction: column;
}

.friend-list .friend-name {
  font-weight: bold;
}

.friend-list .friend-email {
  color: #888;
}

.friend-list button {
  padding: 5px 10px;
  background-color: #ffda77;
  border: none;
  color: #5a3e36;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.friend-list button:hover {
  background-color: #f6c564;
}
</style>
