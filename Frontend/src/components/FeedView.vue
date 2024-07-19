<template>
    <div id="feed">
      <div class="left-side">
        <h3>Chat</h3>
        <!-- Add your chat UI here -->
      </div>
      <div class="main-content">
        <div class="post-box">
          <textarea v-model="newPost" placeholder="What's on your mind?" rows="3"></textarea>
          <button @click="addPost">Post</button>
        </div>
        <div class="posts">
          <div v-for="post in posts" :key="post.id" class="post">
            <p>{{ post.text }}</p>
          </div>
        </div>
      </div>
      <div class="right-side">
        <h3>Options</h3>
        <ul>
          <li>Calendar</li>
          <li>To-Do List</li>
          <li>Games</li>
          <!-- Add more options here -->
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'FeedView',
    setup() {
      const newPost = ref('');
      const posts = ref([
        { id: 1, text: 'This is the first post' },
        { id: 2, text: 'This is the second post' },
      ]);
  
      const addPost = () => {
        if (newPost.value.trim() !== '') {
          posts.value.push({ id: posts.value.length + 1, text: newPost.value });
          newPost.value = '';
        }
      };
  
      return {
        newPost,
        posts,
        addPost,
      };
    },
  };
  </script>
  
  <style scoped>
  #feed {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    background-color: #f4f4f4;
  }
  
  .left-side, .right-side {
    width: 20%;
    background-color: #fff;
    padding: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .main-content {
    width: 55%;
    background-color: #fff;
    padding: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .post-box {
    margin-bottom: 20px;
  }
  
  textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
  }
  
  button {
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .posts {
    margin-top: 20px;
  }
  
  .post {
    background-color: #f9f9f9;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
  }
  </style>
  