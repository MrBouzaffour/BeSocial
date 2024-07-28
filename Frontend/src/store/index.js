// This file sets up the Vuex store for managing state in your Vue.js application.
import { createStore } from 'vuex';
import axios from '../utils/axios'; // Import the configured Axios instance

const store = createStore({
  state: {
    posts: [],
    user: null,
  },
  mutations: {
    SET_POSTS(state, posts) {
      state.posts = posts;
    },
    ADD_POST(state, post) {
      state.posts.unshift(post);
    },
    ADD_LIKE(state, { postId, likes }) {
      const post = state.posts.find(p => p._id === postId);
      if (post) {
        post.likes = likes;
      }
    },
    ADD_COMMENT(state, { postId, comments }) {
      const post = state.posts.find(p => p._id === postId);
      if (post) {
        post.comments = comments;
      }
    },
    SET_USER(state, user) {
      console.log('User set:', user); // Debug: log user being set
      state.user = user;
    },
  },
  actions: {
    async fetchPosts({ commit }) {
      const response = await axios.get('/posts');
      console.log('Fetched posts:', response.data); // Log the fetched posts
      commit('SET_POSTS', response.data);
    },
    async addPost({ commit }, postData) {
      const response = await axios.post('/posts', postData);
      console.log('Post added:', response.data); // Log the added post
      commit('ADD_POST', response.data);
    },
    async addLike({ commit }, postId) {
      const response = await axios.put(`/posts/like/${postId}`);
      console.log('Post liked:', response.data); // Log the liked post
      commit('ADD_LIKE', { postId, likes: response.data });
    },
    async addComment({ commit }, { postId, text }) {
      const response = await axios.post(`/posts/comment/${postId}`, { text });
      console.log('Comment added:', response.data); // Log the added comment
      commit('ADD_COMMENT', { postId, comments: response.data });
    },
    async login({ commit }, token) {
      localStorage.setItem('token', token);
      axios.defaults.headers.common['x-auth-token'] = token;

      try {
        const response = await axios.get('/auth');
        console.log('User data received:', response.data); // Debug: log user data received
        commit('SET_USER', response.data);
      } catch (error) {
        console.error('Failed to fetch user data:', error); // Debug: log any errors
        commit('SET_USER', null);
      }
    },
    async logout({ commit }) {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['x-auth-token'];
      commit('SET_USER', null);
    },
  },
  getters: {
    isAuthenticated: state => !!state.user,
    allPosts: state => state.posts,
  },
  modules: {},
});

export default store;
