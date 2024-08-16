<template>
  <div class="feed-container">
    <UserPostForm />
    <div v-if="posts.length > 0" class="posts-list">
      <div v-for="post in posts" :key="post._id" class="post">
        <div class="post-header">
          <div class="user-info">
            <h3>{{ post.name }} {{ post.lastname }}</h3>
            <span class="post-date">{{ new Date(post.date).toLocaleDateString() }}</span>
          </div>
          <button v-if="post.user === currentUser._id" @click="handleDeletePost(post._id)" class="delete-post">
            <i class="fas fa-trash-alt"></i> Delete
          </button>
        </div>
        <p class="post-text">{{ post.text }}</p>
        <div class="post-actions">
          <button @click="likePost(post._id)" v-if="!hasLikedPost(post)">
            <i class="fas fa-thumbs-up"></i> Like ({{ post.likes.length }})
          </button>
          <button @click="unlikePost(post._id)" v-if="hasLikedPost(post)">
            <i class="fas fa-thumbs-down"></i> Unlike ({{ post.likes.length }})
          </button>
          <button @click="toggleComments(post._id)">
            <i class="fas fa-comments"></i> Comments ({{ post.comments.length }})
          </button>
        </div>
        <div v-if="showComments[post._id]" class="comments">
          <div v-for="comment in post.comments" :key="comment._id" class="comment">
            <div class="comment-header">
              <h4>{{ comment.name }}</h4>
              <span class="comment-date">{{ new Date(comment.date).toLocaleDateString() }}</span>
            </div>
            <p>{{ comment.text }}</p>
            <button v-if="comment.user === currentUser._id" @click="handleDeleteComment(post._id, comment._id)" class="delete-comment">
              <i class="fas fa-trash-alt"></i> Delete
            </button>
          </div>
          <form @submit.prevent="submitComment(post._id)" class="comment-form">
            <input v-model="commentText[post._id]" placeholder="Add a comment" />
            <button type="submit">
              <i class="fas fa-paper-plane"></i> Submit
            </button>
          </form>
        </div>
      </div>
    </div>
    <div v-else class="no-posts">
      <p>No posts available</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import UserPostForm from './UserPostForm.vue';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';

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
    ...mapGetters(['allPosts', 'isAuthenticated']),
    posts() {
      return this.allPosts || [];
    },
    currentUser() {
      return this.$store.state.user;
    }
  },
  methods: {
    ...mapActions(['fetchPosts', 'addLike', 'removeLike', 'deletePost', 'addComment', 'deleteComment']),
    async handleDeletePost(postId) {
      try {
        const response = await this.deletePost(postId);
        if (response && response.msg === 'Post removed') {
          toast.success('Post deleted successfully');
        } else {
          throw new Error('Unexpected response');
        }
      } catch (error) {
        if (error && error.response) {
          if (error.response.status === 404) {
            toast.error('Post not found.');
          } else if (error.response.status === 401) {
            toast.error('You are not authorized to delete this post.');
          } else {
            toast.error('Failed to delete post. Please try again later.');
          }
        } else {
          toast.error('An unexpected error occurred.');
          console.error('Delete post failed:', error.message || error);
        }
      }
    },
    likePost(postId) {
      this.addLike(postId);
    },
    unlikePost(postId) {
      this.removeLike(postId);
    },
    hasLikedPost(post) {
      return post.likes.some(like => like.user === this.currentUser._id);
    },
    submitComment(postId) {
      if (this.commentText[postId].trim() !== '') {
        this.addComment({ postId, text: this.commentText[postId] });
        this.commentText[postId] = '';
      } else {
        toast.error('Comment text cannot be empty.');
      }
    },
    async handleDeleteComment(postId, commentId) {
      try {
        await this.deleteComment({ postId, commentId });
        toast.success('Comment deleted successfully');
      } catch (error) {
        toast.error('Failed to delete comment. Please try again later.');
      }
    },
  },
  created() {
    this.fetchPosts();
  },
};
</script>

<style scoped>
.feed-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.posts-list {
  margin-top: 20px;
}

.post {
  padding: 20px;
  margin-bottom: 20px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  transition: box-shadow 0.3s ease;
}

.post:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-info h3 {
  margin-right: 10px;
  font-size: 1.2rem;
  color: #333;
}

.post-date {
  font-size: 0.9rem;
  color: #888;
}

.post-text {
  font-size: 1rem;
  color: #444;
  margin-bottom: 15px;
  line-height: 1.5;
}

.post-actions {
  display: flex;
  justify-content: flex-start;
  gap: 15px;
}

.post-actions button {
  background-color: #007bff;
  border: none;
  color: white;
  padding: 8px 12px;
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.post-actions button:hover {
  background-color: #0056b3;
}

.delete-post {
  background-color: #dc3545;
  border: none;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
}

.delete-comment {
  background-color: #dc3545;
  border: none;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 0.8rem;
}

.comments {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
}

.comment {
  background-color: #f9f9f9;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.comment-header h4 {
  font-size: 1rem;
  color: #333;
}

.comment-date {
  font-size: 0.8rem;
  color: #888;
}

.comment p {
  margin: 0;
  font-size: 0.9rem;
  color: #555;
}

.comment-form {
  display: flex;
  margin-top: 10px;
  align-items: center;
}

.comment-form input {
  flex: 1;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.comment-form button {
  padding: 10px 20px;
  background-color: #28a745;
  border: none;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.comment-form button:hover {
  background-color: #218838;
}

.no-posts {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
}
</style>
