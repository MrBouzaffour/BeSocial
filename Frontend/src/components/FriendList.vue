<template>
  <div class="friend-list">
    <h3>Search Results</h3>
    <ul>
      <li v-for="friend in searchResults" :key="friend._id">
        <div class="friend-info">
          <div class="friend-name">{{ friend.name }} {{ friend.lastname }}</div>
          <div class="friend-email">{{ friend.email }}</div>
        </div>
        <button @click="sendFriendRequest(friend._id)">Add Friend</button>
      </li>
    </ul>
  </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['searchResults'])
  },
  methods: {
    ...mapActions(['sendFriendRequest']),
  }
}
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
