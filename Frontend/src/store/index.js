import { createStore } from 'vuex';
import axios from '../utils/axios'; // Import the configured Axios instance

export default createStore({
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
      state.user = user;
    },
  },
  actions: {
    async fetchPosts({ commit }) {
      const response = await axios.get('/api/posts');
      commit('SET_POSTS', response.data);
    },
    async addPost({ commit }, postData) {
      const response = await axios.post('/api/posts', postData);
      commit('ADD_POST', response.data);
    },
    async addLike({ commit }, postId) {
      const response = await axios.put(`/api/posts/like/${postId}`);
      commit('ADD_LIKE', { postId, likes: response.data });
    },
    async addComment({ commit }, { postId, text }) {
      const response = await axios.post(`/api/posts/comment/${postId}`, { text });
      commit('ADD_COMMENT', { postId, comments: response.data });
    },
    async login({ commit }, token) {
      localStorage.setItem('token', token);
      axios.defaults.headers.common['x-auth-token'] = token;
      const response = await axios.get('/api/auth');
      commit('SET_USER', response.data);
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
