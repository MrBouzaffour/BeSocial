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
      password: ''
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
  margin: 0;
  background: #f2f2f2; /* Light grey */
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

.auth-header {
  margin-bottom: 20px;
}

.auth-header h2 {
  font-size: 24px;
  color: #5a3e36; /* Dark brown */
}

.form-group {
  margin-bottom: 15px;
}

.auth-container input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.auth-container button.btn {
  width: 100%;
  padding: 10px;
  background-color: #8bc34a; /* Light green */
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
}

.auth-container button.btn:hover {
  background-color: #7cb342; /* Slightly darker green */
}

.switch-auth {
  margin-top: 20px;
  color: #555;
}

.switch-auth a {
  color: #8bc34a; /* Light green */
  text-decoration: none;
}
</style>
