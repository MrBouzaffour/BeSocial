<template>
  <div>
    <UserPostForm />
    <div v-for="post in posts" :key="post._id" class="post">
      <div class="post-header">
        <h3>{{ post.name }}</h3>
      </div>
      <p class="post-text">{{ post.text }}</p>
      <div class="post-actions">
        <button @click="likePost(post._id)">Like ({{ post.likes.length }})</button>
        <button @click="toggleComments(post._id)">Comments ({{ post.comments.length }})</button>
      </div>
      <div v-if="showComments[post._id]" class="comments">
        <div v-for="comment in post.comments" :key="comment._id" class="comment">
          <h4>{{ comment.name }}</h4>
          <p>{{ comment.text }}</p>
        </div>
        <form @submit.prevent="addComment(post._id)">
          <input v-model="commentText[post._id]" placeholder="Add a comment" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import UserPostForm from './UserPostForm.vue';
import { ref } from 'vue';

export default {
  name: 'UserFeed',
  components: { UserPostForm },
  setup() {
    const showComments = ref({});
    const commentText = ref({});

    const toggleComments = (postId) => {
      showComments.value[postId] = !showComments.value[postId];
    };

    return {
      showComments,
      commentText,
      toggleComments,
    };
  },
  computed: {
    ...mapGetters(['allPosts']),
    posts() {
      return this.allPosts;
    }
  },
  methods: {
    ...mapActions(['fetchPosts', 'addLike', 'addComment']),
    likePost(postId) {
      this.addLike(postId);
    },
    addComment(postId) {
      this.addComment({ postId, text: this.commentText[postId] });
      this.commentText[postId] = '';
    }
  },
  created() {
    this.fetchPosts();
  },
};
</script>

<style scoped>
.post {
  padding: 20px;
  margin-bottom: 20px;
  background-color: #fffbea; /* Soft honey background */
  border: 2px solid #ffd966; /* Honey border */
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.post-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.bee-icon {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.post-header h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #6d4c41; /* Warm brown color */
}

.post-text {
  font-size: 1.2rem;
  color: #4e342e; /* Slightly darker brown */
  margin-bottom: 10px;
}

.post-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.post-actions button {
  background-color: #ffb74d; /* Warm orange color */
  border: none;
  color: white;
  padding: 10px 15px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.post-actions button:hover {
  background-color: #f57c00; /* Darker orange */
}

.comments {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #ffd966; /* Honey border */
}

.comment {
  background-color: #fff; /* White background */
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}

.comment h4 {
  margin: 0 0 5px;
  font-size: 1rem;
  color: #6d4c41; /* Warm brown color */
}

.comment p {
  margin: 0;
  font-size: 1rem;
  color: #4e342e; /* Slightly darker brown */
}

form {
  display: flex;
  margin-top: 10px;
}

form input {
  flex: 1;
  padding: 10px;
  margin-right: 10px;
  border: 2px solid #ffd966; /* Honey border */
  border-radius: 5px;
}

form button {
  padding: 10px 20px;
  background-color: #ffb74d; /* Warm orange color */
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

form button:hover {
  background-color: #f57c00; /* Darker orange */
}
</style>
