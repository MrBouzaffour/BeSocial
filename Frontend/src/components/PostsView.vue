<template>
  <div id="posts">
    <h2>Create a Post</h2>
    <form @submit.prevent="createPost">
      <textarea v-model="postText" placeholder="What's on your mind?" required></textarea>
      <button type="submit">Post</button>
    </form>
    <h2>Posts</h2>
    <div id="post-list">
      <div v-for="post in posts" :key="post._id">
        <p>{{ post.text }}</p>
        <small>by {{ post.name }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'PostsView',
  setup() {
    const postText = ref('');
    const posts = ref([]);

    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        posts.value = response.data;
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    const createPost = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:5000/api/posts', {
          text: postText.value,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        });
        alert(response.data.msg || 'Post created successfully');
        fetchPosts();
        postText.value = '';
      } catch (error) {
        console.error('Error creating post:', error);
      }
    };

    onMounted(fetchPosts);

    return {
      postText,
      posts,
      createPost,
      fetchPosts,
    };
  },
};
</script>
