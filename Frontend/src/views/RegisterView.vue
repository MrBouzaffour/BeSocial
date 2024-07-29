<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-header">
        <h2>Register</h2>
      </div>
      <form @submit.prevent="register">
        <div class="form-group">
          <input v-model="name" placeholder="Name" required />
        </div>
        <div class="form-group">
          <input v-model="lastname" placeholder="Last Name" required />
        </div>
        <div class="form-group">
          <input v-model="email" placeholder="Email" required type="email" />
        </div>
        <div class="form-group">
          <input v-model="password" placeholder="Password" required type="password" />
        </div>
        <button class="btn" type="submit">Register</button>
      </form>
      <p v-if="message" class="error-message">{{ message }}</p>
      <div class="switch-auth">
        Already have an account? <router-link to="/login">Login here</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../utils/axios'; // Make sure the axios instance is correctly configured

export default {
  data() {
    return {
      name: '',
      lastname: '',
      email: '',
      password: '',
      message: ''
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('/users/register', {
          name: this.name,
          lastname: this.lastname,
          email: this.email,
          password: this.password
        });
        console.log('Registration successful:', response.data);
        this.$router.push('/login');
      } catch (error) {
        console.error('Error registering:', error.response ? error.response.data : error.message);
        this.message = 'User already exist. Please try again.'; 

      }
    }
  }
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