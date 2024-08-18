<template>
  <!-- Container for the search bar and results -->
  <div class="search-bar-container">
    <!-- Input field bound to `query` with debounced search on input -->
    <input 
      v-model="query" 
      @input="debouncedSearch" 
      placeholder="Search by name or last name" 
      aria-label="Search users by name or last name"
    />

    <!-- Conditional rendering: If users array has items, display them -->
    <ul v-if="users.length" class="search-results">
      <!-- Loop through `users` array and display each user's name and last name -->
      <li v-for="user in users" :key="user._id">
        <a @click="viewProfile(user._id)">{{ user.name }} {{ user.lastname }}</a>
      </li>
    </ul>
    <!-- Optional message when no users are found -->
    <p v-else>No users found.</p>
  </div>
</template>

<script>
import axios from '@/utils/axios'; // Axios instance for making API requests
import _ from 'lodash'; // Lodash library for utility functions like debouncing

export default {
  data() {
    return {
      query: '', // Search query entered by the user
      users: []  // Array to hold the search results (users)
    };
  },
  created() {
    // Creating a debounced version of the search method to delay execution 
    // until the user stops typing for 300ms, improving performance.
    this.debouncedSearch = _.debounce(this.search, 300);
  },
  methods: {
    // Method to perform the search when the query length exceeds 2 characters
    async search() {
      if (this.query.length > 2) {
        try {
          // API request to search for users based on the query
          const response = await axios.get('/api/users/search', {
            params: { query: this.query }
          });
          console.log('API Response:', response.data); // Debug: Log API response
          this.users = response.data; // Update `users` array with the search results
          console.log('Updated Users:', this.users); // Debug: Log the updated users array
        } catch (error) {
          console.error('Search error:', error); // Log any errors encountered during the request
          this.users = []; // Clear `users` array if an error occurs
        }
      } else {
        // Clear `users` array if the query is too short
        this.users = [];
      }
    },
    // Method to navigate to a user's profile when their name is clicked
    viewProfile(id) {
      this.$router.push(`/profile/${id}`); // Navigate to the profile page of the selected user
    }
  }
};
</script>

<style scoped>
/* Styling for the search bar container */
.search-bar-container {
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
}

/* Styling for the input field */
.search-bar-container input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

/* Styling for the search results dropdown */
.search-results {
  position: absolute;
  width: 100%;
  background: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin-top: 5px;
  z-index: 10;
}

/* Styling for each user item in the search results */
.search-results li {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}

/* Remove border on the last item */
.search-results li:last-child {
  border-bottom: none;
}

/* Hover effect for search results */
.search-results li:hover {
  background: #f2f2f2;
}
</style>
