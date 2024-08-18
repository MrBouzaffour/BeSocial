<template>
  <div class="search-bar-container">
    <input 
      v-model="query" 
      @input="debouncedSearch" 
      placeholder="Search by name or last name" 
      class="search-input" 
    />
    <ul v-if="filteredUsers.length" class="search-results">
      <li v-for="user in filteredUsers" :key="user._id" @click="viewProfile(user._id)" class="search-result-item">
        <div class="result-content">
          <p class="result-name">{{ user.name }} {{ user.lastname }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from '../utils/axios';
import { debounce } from 'lodash';

export default {
  data() {
    return {
      query: '',
      users: [],
    };
  },
  computed: {
    filteredUsers() {
      return this.users.filter(user => 
        user.name.toLowerCase().includes(this.query.toLowerCase()) ||
        user.lastname.toLowerCase().includes(this.query.toLowerCase())
      );
    }
  },
  created() {
    this.debouncedSearch = debounce(this.search, 300);
  },
  methods: {
    async search() {
      if (this.query.length > 2) {
        try {
          const response = await axios.get('/users/search', {
            params: { query: this.query }
          });
          this.users = response.data;
        } catch (error) {
          console.error('Error fetching users:', error);
          this.users = [];
        }
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
  z-index: 1000; /* Ensures the search bar is above other elements */
}

.search-input {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  background-color: white;  
  color: #333;  
  border: 1px solid #ccc;  
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  
  transition: box-shadow 0.3s ease, border-color 0.3s ease;  
}

.search-results {
  position: absolute;
  top: 100%; 
  left: 0; 
  width: 100%;
  background: white;  
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);  
  border-radius: 8px;
  margin-top: 5px; 
  z-index: 1100; /* Ensure this dropdown appears above everything */
  max-height: 300px;  
  overflow-y: auto;  
  padding: 0;
  list-style-type: none;
}

.search-result-item {
  padding: 12px;
  cursor: pointer;
  transition: background 0.3s ease;  
  border-bottom: 1px solid #eee;  
  display: flex;
  align-items: center;
}

.result-name {
  margin: 0;
  font-size: 16px;
  color: #333;  
}

.search-result-item:hover {
  background: #f5f5f5;  
}
</style>
