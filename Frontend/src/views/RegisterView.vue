<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-header">
        <h2>Join the Hive</h2>
      </div>
      <form @submit.prevent="register">
        <div class="form-group">
          <input v-model="name" type="text" placeholder="Name" required />
        </div>
        <div class="form-group">
          <input v-model="email" type="email" placeholder="Email" required />
        </div>
        <div class="form-group">
          <input v-model="password" type="password" placeholder="Password" required />
        </div>
        <button type="submit" class="btn">Join the Hive</button>
      </form>
      <p class="switch-auth">Already a member? <router-link to="/login">Buzz In</router-link></p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'RegisterView',
  setup() {
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    const register = async () => {
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: name.value, email: email.value, password: password.value }),
        });
        const data = await response.json();
        if (data.token) {
          localStorage.setItem('token', data.token);
          alert('Welcome to the Hive!');
          router.push('/feed');
        } else {
          alert(data.msg || 'Registration failed');
        }
      } catch (error) {
        console.error('Error registering:', error);
      }
    };

    return {
      name,
      email,
      password,
      register,
    };
  },
};
</script>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background: #fff3b0; /* Soft yellow background */
}

.auth-container {
  max-width: 400px;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
  position: relative;
}

.auth-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.bee-logo {
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
}

.auth-container h2 {
  font-size: 24px;
  color: #5a3e36;
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

.btn {
  width: 100%;
  padding: 10px;
  background-color: #ffda77;
  color: #5a3e36;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #f6c564;
}

.switch-auth {
  margin-top: 15px;
  font-size: 14px;
}

.switch-auth a {
  color: #5a3e36;
  text-decoration: none;
  font-weight: bold;
}
</style>
