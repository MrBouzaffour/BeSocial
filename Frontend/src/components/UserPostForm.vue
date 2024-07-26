<template>
    <div class="post-form">
      <form @submit.prevent="submitPost">
        <textarea v-model="text" placeholder="What's on your mind?"></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    name: 'UserPostForm',
    setup() {
      const text = ref('');
      const store = useStore();
  
      const submitPost = async () => {
        try {
          await store.dispatch('addPost', { text: text.value });
          text.value = ''; // Clear the textarea after submission
        } catch (err) {
          console.error('Failed to submit post:', err);
        }
      };
  
      return {
        text,
        submitPost,
      };
    },
  };
  </script>
  
  <style scoped>
  .post-form {
    margin-bottom: 20px;
  }
  
  textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  button {
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  