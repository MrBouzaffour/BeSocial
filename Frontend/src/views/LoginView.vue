<template>
  <div class="auth-page">
    <div class="auth-container">
      <h2>Buzz In</h2>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Buzz In</button>
      </form>
      <p v-if="message" class="error-message">{{ message }}</p>
      <p class="switch-auth">
        Don't have an account? <router-link to="/register">Sign Up</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from '../utils/axios'; // Import the configured Axios instance
import { mapActions } from 'vuex';
import store from '../store';

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      message: ''

    };
  },
  methods: {
    ...mapActions(['login']),
    async login() {
      try {
        const response = await axios.post('/users/login', {
          email: this.email,
          password: this.password
        });
        const token = response.data.token;
        console.log('Token received:', token); // Debug: log token received
        await store.dispatch('login', token);
        console.log('User after login:', this.$store.state.user); // Debug: log user state
        this.$router.push('/feed');
      } catch (error) {
        console.error('Login failed:', error);
        this.message = 'Invalid email or password. Please try again.'; 

      }
    },
  },
};
</script>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
}

.auth-container {
  max-width: 400px;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
}

.auth-container h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #5a3e36;
}

.auth-container input {
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
}

.auth-container button {
  width: calc(100% - 20px);
  padding: 10px;
  background-color: #ffda77;
  color: #5a3e36;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
}

.auth-container button:hover {
  background-color: #f6c564;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.switch-auth {
  margin-top: 20px;
  color: #555;
}

.switch-auth a {
  color: #ffda77;
  text-decoration: none;
}
</style>