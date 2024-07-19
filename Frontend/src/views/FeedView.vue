<template>
  <div class="feed">
    <aside class="sidebar left">
      <div class="option">
        <router-link to="/calendar">Calendar</router-link>
      </div>
      <div class="option">
        <router-link to="/todolist">To-Do List</router-link>
      </div>
      <div class="option">
        <router-link to="/games">Games</router-link>
      </div>
    </aside>
    <main class="main-content">
      <div class="post-box">
        <textarea v-model="postContent" placeholder="What's on your mind?"></textarea>
        <button @click="createPost">Post</button>
      </div>
      <div class="posts">
        <div class="post" v-for="post in posts" :key="post.id">
          <p>{{ post.content }}</p>
        </div>
      </div>
    </main>
    <aside class="sidebar right">
      <div class="chat">
        <h2>Chat</h2>
        <!-- Chat UI goes here -->
      </div>
    </aside>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'FeedView',
  setup() {
    const postContent = ref('');
    const posts = ref([]);

    const createPost = async () => {
      // Implement the logic to create a post
      const newPost = {
        id: Date.now(),
        content: postContent.value,
      };
      posts.value.push(newPost);
      postContent.value = '';
    };

    onMounted(async () => {
      // Fetch initial posts
      posts.value = await fetchPosts();
    });

    const fetchPosts = async () => {
      // Implement the logic to fetch posts
      return [
        { id: 1, content: 'This is a post' },
        { id: 2, content: 'This is another post' },
      ];
    };

    return {
      postContent,
      posts,
      createPost,
    };
  },
};
</script>

<style scoped>
.feed {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 20%;
  background-color: #f0f7f9;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.main-content {
  width: 60%;
  padding: 20px;
  background-color: #fff;
}

.post-box {
  margin-bottom: 20px;
}

.post-box textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-bottom: 10px;
}

.post-box button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

.post-box button:hover {
  background-color: #0056b3;
}

.posts {
  display: flex;
  flex-direction: column;
}

.post {
  background-color: #f9f9f9;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.right .chat {
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 100%;
}
</style>
