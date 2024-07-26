<template>
  <div class="auth-page">
    <div class="auth-container">
      <h2>Buzz In</h2>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Buzz In</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from '../utils/axios'; // Import the configured Axios instance
import { mapActions } from 'vuex';

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    ...mapActions(['login']),
    async login() {
      try {
        const response = await axios.post('/api/auth/login', {
          email: this.email,
          password: this.password
        });
        console.log('Login response:', response.data);
        const token = response.data.token;
        await this.login(token);
        this.$router.push('/feed');
      } catch (error) {
        console.error('Login failed:', error);
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
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.auth-container button {
  width: 100%;
  padding: 10px;
  background-color: #ffda77;
  color: #5a3e36;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
}

.auth-container button:hover {
  background-color: #f6c564;
}
</style>
